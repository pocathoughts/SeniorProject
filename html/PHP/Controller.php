<?php
//funtion inclusion

include ('Login.php');
include ('RequestClubs.php');
include ('CreateAccount.php');


//Packet data error checking/setup
$dataContainer = $_POST;
$returnData['errno'] = -1;      //-1 is defualt, on success it should be set to 0;
$returnData['errstr'] = '';
$returnData['data'] = array();

if (!isset($dataContainer)){
  $returnData['errno'] = 1;
  $returnData['errstr'] = 'Incorrect HTTP Function used or no data passed';
  exitfnc($returnData);
}

//Function Detection
$functionChoice = $dataContainer['phpFunction'];
if (!isset($functionChoice)){
  $returnData['errno'] = 2;
  $returnData['errstr'] = 'phpFunction Not Set';
  exitfnc($returnData);
}

//Database Open
$link = ConnectDatabase($returnData);

//Check Session Status
if ( !($functionChoice == 'Login' or $functionChoice == 'CreateUserAccount') ){
  //Login and CreateUserAccount are the only functions that don't require and active session  
  checkSession($link, $dataContainer, $returnData);
}

//Function Redirection
switch ($functionChoice) {
  case 'Login':
    LoginValidate($dataContainer, $returnData);
    Login($link, $dataContainer, $returnData);
    break;
  case 'CreateUserAccount':
    CreateUserAccountValidate($dataContainer, $returnData);
    CreateUserAccount($link, $dataContainer, $returnData);
    break;
  case 'GetAttachedClubs':
    GetAttachedClubsValidate($dataContainer, $returnData);
    GetAttachedClubs($link, $dataContainer, $returnData);
    break;
  default:
    echo "shitsnacks";
    break;
}

disconnectDatabase($link);
exitfnc($returnData);



//====================================Functions========================
  function connectDatabase(&$returnData){
    $link = mysqli_connect("127.0.0.1", "root", "user1", "LoginSys");
    if (!$link) {
      $returnData['errno'] = 3;
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
  
  function checkSession($link, $data, &$returnData){    //look into removing all sessions that are not tied to requested email on success.
    //TODO Validate that email and session are present
	
  
    //Get the account_id attached to the email
    $email = $data['email'];
    $accountIDQuery = "SELECT * FROM user_accounts WHERE email = '$email'";
    if( ! $accountQueryResuts = mysqli_query($link,$accountIDQuery) ) {
      $returnData['errno'] = 18;
      $returnData['errstr'] = "Mysql account_id query error: " . mysqli_error($link);
      exitfnc($returnData);
    }
    if (mysqli_num_rows($accountQueryResuts) == 0){   //no matching records
      $returnData['errno'] = 19;
      $returnData['errstr'] = "No account found for " . $data['email'] . ", please create one";
      exitfnc($returnData);
    } elseif (mysqli_num_rows($accountQueryResuts) > 1){   //multiple matching records, supposed to be Unique, Database error
      $returnData['errno'] = 20;
      $returnData['errstr'] = "Error, multiple accounts found.";
      deleteSessions($link, $data);
      //ALERT SYS ADMIN
      exitfnc($returnData);
    }
    $account = mysqli_fetch_array($accountQueryResuts, MYSQLI_ASSOC);
    $data['account_id'] = $account['account_id'];
    
    
    //query database for that session
    $sessionQuery = "SELECT * FROM active_sessions WHERE account_id = " . $data['account_id'];
    if( ! $sessionQueryResuts = mysqli_query($link,$sessionQuery) ) {
      $returnData['errno'] = 13;
      $returnData['errstr'] = "Mysql session query error: " . mysqli_error($link);
      exitfnc($returnData);
    }
    if (mysqli_num_rows($sessionQueryResuts) == 0){   //no matching records
      $returnData['errno'] = 14;
      $returnData['errstr'] = "No active session, please log in again";
      exitfnc($returnData);
    } elseif (mysqli_num_rows($sessionQueryResuts) > 1){   //multiple matching records, supposed to be Unique, Database error
      $returnData['errno'] = 15;
      $returnData['errstr'] = "Error, multiple sessions found.  Please log in again";
      deleteSessions($link, $data, $returnData);
      //ALERT SYS ADMIN
      exitfnc($returnData);
    }
    
    //check for matching session_id and valid/non-expired timestamps
    $row = mysqli_fetch_array($sessionQueryResuts, MYSQLI_ASSOC);
    if ($data['session_id'] != $row['session_id']){
      $returnData['errno'] = 16;
      $returnData['errstr'] = "Invalid session id, please log in again";
      exitfnc($returnData);
    }
    
    $currentTime = time();
    $creationTime = strtotime($row['creation_time']) - $currentTime;
    $recentTime = strtotime($row['recent_time']) - $currentTime;
    if ( $creationTime > 86400 OR $recentTime > 7200 ){    //creation : 24 hours, recent : 2 hours
      deleteSessions($link, $data, $returnData);
      $returnData['errno'] = 17;
      $returnData['errstr'] = "Session expired, please log in again";
      exitfnc($returnData);
    } else {
      //TODO update timestamp
      
    }
  } 
  
  function deleteSessions($link, $data, &$returnData) {
    $sessionDeleteQuery = "DELETE FROM active_sessions WHERE account_id = " . data['account_id'];
    if( !mysqli_query($link,$sessionDeleteQuery) ) {
      $returnData['errno'] = 11;
      $returnData['errstr'] = "Mysql Session delete error: " . mysqli_error($link);
      exitfnc($returnData);
    }
  }
  
  function updateSessionTimestamp(){
    //todo

    mysqli_query("update `table` set date_date=now()");
  }
  
  function exitfnc($returnData){
    $result = json_encode($returnData);
    echo $result;
    exit;
  }

?>
