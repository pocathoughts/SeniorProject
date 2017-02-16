<?php
//funtion inclusion

include ('Login.php');
include ('RequestClubs.php');
//include (CreateAccount.php);

//Packet data error checking/setup
$dataContainer = $_POST;
$returnData['errno'] = -1;      //-1 is defualt, on success it should be set to 0;
$returnData['etrstr'] = '';
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
  
  function checkSession($link, $data, &$returnData){
    //Validate that email and session are present
    //query database for that session
    //check the last updated feild for timestamp
    //return if sucessful exit if not 
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


  function CreateAccount ($link, $username, $password, $email, $approve, $create){
    $insertLine = "INSERT INTO user_accounts (username, password, email, request_approval, create_admin_account) VALUES ('$username', '$password', '$email', '$approve', '$create');";
    if (mysqli_query($link, $insertLine)) {
      $result = "New record created successfully";
    } else {
      $result = "Error: " . $insertLine . "\n" . mysqli_error($link);
    }
    return $result;
  }
  function ValidateAccountDetails ($username, $password, $email){
    return true;
  }
?>
