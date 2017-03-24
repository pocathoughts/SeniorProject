<?php

//--------------------------------------Permission Check --------------------------------------------
function CreateJoinClubRequestPermissionCheck ($data, &$returnData){
  //null, nothing to do here any valid user can request
  //IDEA blocked users?  no plans on implementing
}

function RespondJoinClubRequestPermissionCheck ($data, &$returnData){
  //IF ADMIN, ACCEPT
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
  //IF PRESIDENT OF ATTACHED CLUB
  $index = array_search ($data['club_year_id'], $data['permissions']['club_year_id_array']);
  if ( $index === FALSE  ){
    $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User is not associated with Club";
      exitfnc($returnData);
  } else {
    if($data['permissions']['president_bool_array'][$index] == 1){
      //echo 'allowed';
      return;
    } else {
      $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User does not have adaquate permission to accept that request";
      exitfnc($returnData);
    }
  }
}

function DeleteJoinClubRequestPermissionCheck ($data, &$returnData){
}

function GetJoinClubRequestByEmailPermissionCheck ($data, &$returnData){
}

function GetJoinClubRequestByClubPermissionCheck ($data, &$returnData){
}

//--------------------------------------Validation Methods -----------------------------------------
function CreateJoinClubRequestValidate ($link, &$data, &$returnData){
  
//TODO validate data (inject club_year_id)
  if ( strtolower($data['position']) == 'president'){
    $data['president_bool'] = 1;
  } else {
    $data['president_bool'] = 0;
  }
  InjectClubYearIdByClubYear($link, $data, $returnData);
  CreateJoinClubRequestPermissionCheck($data, $returnData);
  
//check account doesnt already have a position for that year/club
  //the user can have multiple deleted accounts. 
  $existingQuery = "SELECT * FROM club_position WHERE account_id = " . $data['account_id'] . " AND club_year_id = " . $data['club_year_id'] . " AND active_bool != 0";
  //echo $query;
  if (!$existingResults = mysqli_query($link,$existingQuery)){
    echo $existingResults;
    $returnData['errcode'] = 5;
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "Mysql club_position query error: " . mysqli_error($link);
    exitfnc($returnData);
  }
  if (mysqli_num_rows($existingResults) > 0){
    $returnData['errcode'] = 3;
    //TODO proper code
    $returnData['errno'] = 3000;
    $returnData['errstr'] = "User already has a position in that club";
    exitfnc($returnData);
  }
  
//check account doesnt already have a pending request for that year/club
  $query = "SELECT * FROM club_position_request WHERE account_id = ".$data['account_id']. " and club_year_id = ".$data['club_year_id']." and status = 0";
  if (!$results = mysqli_query($link,$query)){
    $returnData['errcode'] = 5;
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "Mysql club_position_request query error: " . mysqli_error($link);
    exitfnc($returnData);
  }
  if (mysqli_num_rows($results) > 0){
    $returnData['errcode'] = 3;
    //TODO proper code
    $returnData['errno'] = 3000;
    $returnData['errstr'] = "User already has a request to join that club";
    exitfnc($returnData);
  }
}

function RespondJoinClubRequestValidate ($link, &$data, &$returnData){
//TODO valdite inputs
  //translate decision into 1 or 0 (yes, no)
  //
  InjectClubYearIdByRequest($link, $data, $returnData);
  RespondJoinClubRequestPermissionCheck($data, $returnData);
//check account doesnt already have a position for that year/club
  //the user can have multiple deleted accounts. 
  $existingQuery = "SELECT * FROM club_position WHERE account_id IN (SELECT account_id FROM club_position_request WHERE request_id = " . $data['request_id'] . ") AND club_year_id = " . $data['club_year_id'] . " AND active_bool != 0";
  //echo $query;
  if (!$existingResults = mysqli_query($link,$existingQuery)){
    echo $existingResults;
    $returnData['errcode'] = 5;
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "Mysql club_position query error: " . mysqli_error($link);
    exitfnc($returnData);
  }
  if (mysqli_num_rows($existingResults) > 0){
    $returnData['errcode'] = 3;
    //TODO proper code
    $returnData['errno'] = 3000;
    $returnData['errstr'] = "User already has a position in that club, they need to leave that position before this request can be satisfied";
    exitfnc($returnData);
  }
}

function DeleteJoinClubRequestValidate ($link, &$data, &$returnData){
  //only delete pending requests.  responded requests stay.
  DeleteJoinClubRequestPermissionCheck($data, $returnData);
}

function GetJoinClubRequestByEmailValidate ($link, &$data, &$returnData){
  
  GetJoinClubRequestByEmailPermissionCheck($data, $returnData);
}

function GetJoinClubRequestByClubValidate ($link, &$data, &$returnData){
  
  GetJoinClubRequestByClubPermissionCheck($data, $returnData);
}

//---------------------------------------Calling Function --------------------------------------------
function CreateJoinClubRequest ($link, $data, &$returnData){
  
  CreateJoinClubRequestValidate($link, $data, $returnData);
  
//-----Actual Functionality--------//
  //add request to the table
  $insert = "INSERT INTO club_position_request (account_id, club_year_id, position_name, president_bool) VALUES ('" . $data['account_id'] . "', '" . $data['club_year_id'] . "', '" . strtolower($data['position']) . "', " . $data['president_bool'] . ")";
  if( !mysqli_query($link,$insert) ) {
    $returnData['errcode'] = 5;
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "Mysql club_position_request insert error: " . mysqli_error($link);
    exitfnc($returnData);
  } else {
    //if sucessful set returnData w/ $returnData['data'] = session_id
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    $returnData['data']['status'] = 'successful'; 
    exitfnc($returnData);
  }
}

function RespondJoinClubRequest ($link, $data, &$returnData){

  RespondJoinClubRequestValidate($link, $data, $returnData);
  
//-----Actual Functionality--------//
  //Add response to audit table
  $insertAudit = "INSERT INTO club_position_request_response (request_id, responder_id, decision) VALUES (" . $data['request_id'] . ", " . $data['account_id'] . ", " . $data['decision'] . ")";
  nonQuery($link, $insertAudit, "Insert Request Decison Audit", 5000);
  
  //update request to no longer be pending
  $clubPositionId = 0;
  if ($data['decision']){
    $insertClubPosition = "INSERT INTO club_position (account_id, club_year_id, position_name, president_bool) SELECT account_id, club_year_id, position_name, president_bool FROM club_position_request WHERE request_id = " . $data['request_id'];
    nonQuery($link, $insertClubPosition, "Insert New Position from Request", 5000);
    //query for club_position_id
  } 
  
  $updateRequest = "UPDATE club_position_request SET status = 1, club_position_id = '" . $clubPositionId . "' WHERE request_id = " . $data['request_id'];
  if (nonQuery($link, $updateRequest, "UPDATE Request to non-pending", 5000)){
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    $returnData['data']['status'] = 'successful';
    exitfnc($returnData);
  }
}

function DeleteJoinClubRequest ($link, $data, &$returnData){
  
  DeleteJoinClubRequestValidate($link, $data, $returnData);
  
//-----Actual Functionality--------//
}

function GetJoinClubRequestByEmail ($link, $data, &$returnData){
  
  GetJoinClubRequestByEmailValidate($link, $data, $returnData);
  
//-----Actual Functionality--------//
}

function GetJoinClubRequestByClub ($link, $data, &$returnData){
  
  GetJoinClubRequestByClubValidate($link, $data, $returnData);
  
//-----Actual Functionality--------//
}

//---------------------------------------Helper Function --------------------------------------------
function InjectClubYearIdByClubYear ($link, &$data, &$returnData){
  $query = "SELECT club_year_id FROM club_operating_year WHERE club_id IN (SELECT club_id FROM club_team WHERE club_name = '". $data['club_name'] ."') AND year_id IN (SELECT year_id FROM operating_year WHERE beginning_year = '". $data['year'] ."')";
  
  //perform the query and verify no error in query
  if( ! $result = mysqli_query($link,$query) ) {
    $returnData['errcode'] = 5;  
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "Mysql club_operating_year query error: " . mysqli_error($link);
    exitfnc($returnData);
  }
  
  //verify size of result:
  if (mysqli_num_rows($result) == 0){   //no matching records
      $returnData['errcode'] = 3;
      //TODO proper code
      $returnData['errno'] = 3000;
      $returnData['errstr'] = "No matching record found for " . $data['club_name'] . " and " . $data['year'] . ", please create one";
    exitfnc($returnData);
  } elseif (mysqli_num_rows($result) > 1){   //multiple matching records, supposed to be Unique, Database error
    $returnData['errcode'] = 5;
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "multiple records tied to club/year";
    //ALERT SYS ADMIN
    exitfnc($returnData);
  } else {
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $data['club_year_id'] = $row['club_year_id'];
  }
}

function InjectClubYearIdByRequest ($link, &$data, &$returnData){
  $query = "SELECT club_year_id FROM club_position_request WHERE request_id = " . $data['request_id'];
  
  //perform the query and verify no error in query
  if( ! $result = mysqli_query($link,$query) ) {
    $returnData['errcode'] = 5;  
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "Mysql club_operating_year from club_position_request query error: " . mysqli_error($link);
    exitfnc($returnData);
  }
  
  //verify size of result:
  if (mysqli_num_rows($result) == 0){   //no matching records
      $returnData['errcode'] = 3;
      //TODO proper code
      $returnData['errno'] = 3000;
      $returnData['errstr'] = "invalid request id";
    exitfnc($returnData);
  } elseif (mysqli_num_rows($result) > 1){   //multiple matching records, supposed to be Unique, Database error
    $returnData['errcode'] = 5;
    //TODO proper code
    $returnData['errno'] = 5000;
    $returnData['errstr'] = "multiple records tied to request";
    //ALERT SYS ADMIN
    exitfnc($returnData);
  } else {
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $data['club_year_id'] = $row['club_year_id'];
  }
}
?>
