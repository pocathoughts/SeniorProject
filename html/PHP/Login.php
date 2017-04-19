<?php
function LoginValidate($data, &$returnData){
  //check for null
  if ( !(isset($data['email']) and isset ($data['password']) ) ){
    $returnData['errcode'] = 1;  
    $returnData['errno'] = 1004;
    $returnData['errstr'] = 'Email or password are not set';
    exitfnc($returnData);
  }
  
  //regex check for proper email hook
  $validEmail = true;
  if (strpos($data['email'], '@') == False){     //strpos can return 0 indicating the string is found at the front, use '===' to bypass 0 representing false. '==' is diliberate 
    $validEmail = false;
  }
  if (!$validEmail){
    $returnData['errcode'] = 3;  
    $returnData['errno'] = 3000;
    $returnData['errstr'] = 'Email is malformed based off server requirnments';
    exitfnc($returnData);
  }

  //regex check for proper password hook
  $validPassword = true;
  if ( strlen($data['password']) < 1 or strlen($data['password']) > 20 ){
    $validPassword = false;
  } 
  if (!$validPassword){
    $returnData['errcode'] = 3;  
    $returnData['errno'] = 3001;
    $returnData['errstr'] = 'Password is malformed based off server requirnments';
    exitfnc($returnData);
  }
} 

function Login($link, $data, &$returnData){
  //LoginPermissionCheck($dataContainer, $returnData);
  LoginValidate($data, $returnData);  
  $email = strtolower($data['email']);
  //query building  
  $query = "SELECT * FROM user_account WHERE email = '$email'";
  
  //perform the query and verify no error in query
  if( ! $result = mysqli_query($link,$query) ) {
    $returnData['errcode'] = 5;  
    $returnData['errno'] = 5005;
    $returnData['errstr'] = "Mysql login query error: " . mysqli_error($link);
    exitfnc($returnData);
  }
  
  //verify size of result:
  if (mysqli_num_rows($result) == 0){   //no matching records
      $returnData['errcode'] = 3;
      $returnData['errno'] = 3000;
      $returnData['errstr'] = "No account found for " . $data['email'] . ", please create one";
    exitfnc($returnData);
  } elseif (mysqli_num_rows($result) > 1){   //multiple matching records, supposed to be Unique, Database error
    $returnData['errcode'] = 5;
    $returnData['errno'] = 5006;
    $returnData['errstr'] = "multiple accounts tied to email";
    //ALERT SYS ADMIN
    exitfnc($returnData);
  }

  //if here is reached, one matching record found now check the password
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
  if ( $data['password'] == $row['password'] ){    
    //password matches, create a new session with that username.
    createSession ($link, $row['account_id'], $returnData);
  } else {      
    //password doesn't match, return.
    $returnData['errcode'] = 3;
    $returnData['errno'] = 3002;
    $returnData['errstr'] = 'Email or password is inncorrect';
    exitfnc($returnData);
  }
}

function CreateSession($link, $account_id, &$returnData){
  //delete if exists
  $delete = "DELETE FROM active_session WHERE account_id = '$account_id'";
  if( !mysqli_query($link,$delete) ) {
    $returnData['errcode'] = 5;
    $returnData['errno'] = 5007;
    $returnData['errstr'] = "Mysql Session delete error: " . mysqli_error($link);
    exitfnc($returnData);
  }

  //generate new session id
  $newSesh = md5(rand());

  //insert new session id
  $insert = "INSERT INTO active_session (account_id, session_id) VALUES ('$account_id', '$newSesh')";
  if( !mysqli_query($link,$insert) ) {
    $returnData['errcode'] = 5;
    $returnData['errno'] = 5008;
    $returnData['errstr'] = "Mysql Session insert error: " . mysqli_error($link);
    exitfnc($returnData);
  } else {
    //if sucessful set returnData w/ $returnData['data'] = session_id
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    $returnData['data']['session_id'] = $newSesh; 
  }
  
}

?>
