<?php
//funtion inclusion
header('Access-Control-Allow-Origin: *');
include ('Login.php');
include ('CreateAccount.php');
include ('JoinClubRequest.php');
include ('ClubTeam.php');


//Packet data error checking/setup
$dataContainer = $_POST;
$returnData['errcode'] = -1;      //-1 is defualt, on success it should be set to 0;
$returnData['errno'] = -1;      //-1 is defualt, on success it should be set to 0;
$returnData['errstr'] = '';
$returnData['data'] = array();

if (!isset($dataContainer)){
  $returnData['errcode'] = 1;  
  $returnData['errno'] = 1000;
  $returnData['errstr'] = 'Incorrect HTTP Function used or no data passed';
  exitfnc($returnData);
}

//Function Detection
$functionChoice = $dataContainer['phpFunction'];
if (!isset($functionChoice)){
  $returnData['errcode'] = 1;
  $returnData['errno'] = 1001;
  $returnData['errstr'] = 'phpFunction Not Set';
  exitfnc($returnData);
}

//Database Open
$link = ConnectDatabase($returnData);

//Check Session Status
if ( !($functionChoice == 'Login' or $functionChoice == 'CreateUserAccount') ){
  //Login and CreateUserAccount are the only functions that don't require and active session  
  checkSession($link, $dataContainer, $returnData);
  InjectPermissions($link, $dataContainer);
}

//Function Redirection
switch ($functionChoice) {
  case 'Login':
    Login($link, $dataContainer, $returnData);
    break;
  case 'CreateUserAccount':
    CreateUserAccount($link, $dataContainer, $returnData);
    break;
//--------------------------------JoinClubRequest-----------------------------------
  case 'CreateJoinClubRequest':
    CreateJoinClubRequest($link, $dataContainer, $returnData);
    break;
  case 'RespondJoinClubRequest':
    RespondJoinClubRequest($link, $dataContainer, $returnData);
    break;
  case 'DeleteJoinClubRequest':
    DeleteJoinClubRequest($link, $dataContainer, $returnData);
    break;
  case 'GetJoinClubRequestByUser':
    GetJoinClubRequestByEmail($link, $dataContainer, $returnData);
    break;
  case 'GetJoinClubRequestByEmail':
    GetJoinClubRequestByEmail($link, $dataContainer, $returnData);
    break;
  case 'GetJoinClubRequestByClub':
    GetJoinClubRequestByClub($link, $dataContainer, $returnData);
    break;
//-------------------------------ClubTeamRequest------------------------------------
  case 'GetAttachedClubsByUser':
    GetAttachedClubsByUser($link, $dataContainer, $returnData);
    break;
  case 'GetAllClubs':
    GetAllClubs($link, $dataContainer, $returnData);
    break;
  default:
    $returnData['errcode'] = 1;
    $returnData['errno'] = 1003;
    $returnData['errstr'] = 'phpFunction value is unknown';
    exitfnc($returnData);
    break;
}

disconnectDatabase($link);
exitfnc($returnData);



//====================================Functions========================
  function connectDatabase(&$returnData){
    $link = mysqli_connect("127.0.0.1", "root", "user1", "LoginSys");
    if (!$link) {
      $returnData['errcode'] = 5;
      $returnData['errno'] = 5000;
      $returnData['errstr'] = "Error: Unable to connect to MySQL." . PHP_EOL;
      $returnData['errstr'] += "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
      $returnData['errstr'] += "Debugging error: " . mysqli_connect_error() . PHP_EOL;
      exitfnc($returnData);
    }
    return $link;
  }

  function disconnectDatabase($link){
    mysqli_close($link);
  }
  
  function checkSession($link, &$data, &$returnData){
    //TODO Validate that email and session are present
	  $data['email'] = strtolower($data['email']);
    //Get the account_id attached to the email
    $email = $data['email'];
    $accountQuery = "SELECT * FROM user_account WHERE email = '" . $email . "'";
    $accountQueryResuts = querySingle($link, $accountQuery, "Account Query", 5001, 5, 5000, "Error, Multiple Accounts Found");
    
    if (mysqli_num_rows($accountQueryResuts) == 0){   //no matching records
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2000;
      $returnData['errstr'] = "No account found for " . $data['email'] . ", please create one";
      exitfnc($returnData);
    } 
    
    $account = mysqli_fetch_array($accountQueryResuts, MYSQLI_ASSOC);
    $data['account_id'] = $account['account_id'];
    $data['admin'] = $account['recSport_acc'];
    
    //query database for that session
    $sessionQuery = "SELECT * FROM active_session WHERE account_id = " . $data['account_id'];
    $sessionQueryResuts = queryMultiple($link, $sessionQuery, "Session id Query", 5000);
    
    if (mysqli_num_rows($sessionQueryResuts) == 0){   //no matching records
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2001;
      $returnData['errstr'] = "No active session, please log in again";
      exitfnc($returnData);
    } elseif (mysqli_num_rows($sessionQueryResuts) > 1){   //multiple matching records, supposed to be Unique, Database error
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2002;
      $returnData['errstr'] = "Error, multiple sessions found.  Please log in again";
      deleteSessions($link, $data, $returnData);
      //ALERT SYS ADMIN
      exitfnc($returnData);
    }
    
    //check for matching session_id and valid/non-expired timestamps
    $row = mysqli_fetch_array($sessionQueryResuts, MYSQLI_ASSOC);
    if ($data['session_id'] != $row['session_id']){
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2003;
      $returnData['errstr'] = "Invalid session id, please log in again";
      exitfnc($returnData);
    }
    
    $currentTime = time();
    $creationTime = $currentTime - strtotime($row['creation_time']);
    $recentTime = $currentTime - strtotime($row['last_updated_time']);
    
    if ( $creationTime > 86400 OR $recentTime > 7200 ){    //creation : 24 hours, recent : 2 hours
      deleteSessions($link, $data);
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2004;
      $returnData['errstr'] = "Session expired, please log in again";
      exitfnc($returnData);
    } else {
      updateSessionTimestamp($link, $data);
    }
  } 
  
  function deleteSessions($link, $data) {
    $delete = "DELETE FROM active_session WHERE account_id = " . $data['account_id'];
    nonQuery($link, $delete, "Session Deletion", 5000);
  }
  
  function injectPermissions($link, &$data){
    //add attached club_year_ids to the requester
    $data['permissions']['club_year_id_array'] = array();
    $data['permissions']['president_bool_array'] = array();
    
    $query = "SELECT club_year_id, president_bool FROM club_position WHERE active_bool = 1 AND account_id = ". $data['account_id'];
    $result = queryMultiple($link, $query, "Fetch Clubs Attached to User", 5000);
    
    while ($row = mysqli_fetch_array($result)){
      $rows[] = $row; 
    }
    for ($i = 0; $i < sizeof($rows); $i++){
      $data['permissions']['club_year_id_array'][$i] = $rows[$i][0];
      $data['permissions']['president_bool_array'][$i] = $rows[$i][1];
    }

    //add amdin permissions
    if ($data['admin'] == 1) {
      $data['permissions']['commServ'] = 1;
      $data['permissions']['fundRaise'] = 1;
      $data['permissions']['positions'] = 1;
      //$data['commServ'] = 1;
      //$data['commServ'] = 1;
    } else {
      $data['permissions']['commServ'] = 0;
      $data['permissions']['fundRaise'] = 0;
      $data['permissions']['positions'] = 0;
      //$data['commServ'] = 0;
      //$data['commServ'] = 0;
    }
  }
  
  function updateSessionTimestamp($link, $data){
    $update = "UPDATE active_session SET last_updated_time=now() WHERE account_id = " . $data['account_id'];
    nonQuery($link, $update, "Session last_updated_time Update", 5000);
  }
  
  function exitfnc($returnData){
    $result = json_encode($returnData);
    echo $result;
    exit;
  }
  
  /*
  $link - database
  $query - query performed
  $title - description string
  $errorNo - failed query errorNo
  */
  function queryMultiple($link, $query, $title, $errorNo){
    if( !$results = mysqli_query($link,$query) ) {
      $returnData['errcode'] = 5;
      $returnData['errno'] = $errorNo;
      $returnData['errstr'] = "Mysql " . $title . " error: " . mysqli_error($link);
      exitfnc($returnData);
    }
    return $results;
  }
  
  /*
  $link - database
  $query - query performed
  $title - description string
  $errorNo - failed query errorNo
  $moreThanOneErrorNo - More than one result errno
  $moreThanOneErrorCode - More than one result errco
  $moreThanOneErrorString - More than one result errstr
  */
  function querySingle($link, $query, $title, $errorNo,$moreThanOneErrorCode, $moreThanOneErrorNo , $moreThanOneErrorString){
    if( !$results = mysqli_query($link,$query) ) {
      $returnData['errcode'] = 5;
      $returnData['errno'] = $errorNo;
      $returnData['errstr'] = "Mysql " . $title . " error: " . mysqli_error($link);
      exitfnc($returnData);
    }
    if (mysqli_num_rows($results) > 1){
      $returnData['errcode'] = $moreThanOneErrorCode;
      $returnData['errno'] = $moreThanOneErrorNo;
      $returnData['errstr'] = $moreThanOneErrorString;
      exitfnc($returnData);
    }
    return $results;
  }
  /*
  $link - database
  $query - query performed
  $title - description string
  $errorNo - failed query errorNo
  */
  function nonQuery($link, $nonQuery, $title, $errorNo){
    if( !mysqli_query($link,$nonQuery) ) {
      $returnData['errcode'] = 5;
      $returnData['errno'] = $errorNo;
      $returnData['errstr'] = "Mysql " . $title . " error: " . mysqli_error($link);
      exitfnc($returnData);
    } else {
      return true;
    }
  }

?>
