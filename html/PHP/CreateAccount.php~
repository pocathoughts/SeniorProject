<?php
function CreateUserAccountValidate ($data, &$returnData){
  //validate all data needed data feilds are present (email/account_id) session should be validated already.
}

function CreateUserAccount ($link, $data, &$returnData){
  //validate	
  CreateUserAccountValidate($data, $returnData);
  //no permission check as anyone can create an account
  //add to database
  $email = $data['email'];
  $insert = "INSERT INTO user_account ( email, password, name, recSport_acc) VALUES ('" . $email . "', '" . $data['password'] . "', '" . $data['name'] . "', 0)";
  if( !mysqli_query($link,$insert) ) {
    $returnData['errcode'] = 5;
    $returnData['errno'] = 5009;
    $returnData['errstr'] = "Mysql user account insert error: " . mysqli_error($link);
    exitfnc($returnData);
  } else {
    //if sucessful set returnData w/ $returnData['data'] = session_id
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    $returnData['data']['status'] = 'successful'; 
  }
  
}

?>
