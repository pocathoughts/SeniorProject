<?php

//--------------------------------------Permission Check --------------------------------------------
function CreateJoinClubRequestPermissionCheck ($data, &$returnData){
  //null, nothing to do here
}

function RespondJoinClubRequestPermissionCheck ($data, &$returnData){
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
  //TODO check account doesnt already have a position for that year/club
  $existingQuery = "SELECT * FROM club_position WHERE account_id = " . $data['account_id'] . " AND club_year_id = " . $data['club_year_id'];
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
  //TODO check account doesnt already have a pending request for that year/club
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
}

function DeleteJoinClubRequestValidate ($link, &$data, &$returnData){
}

function GetJoinClubRequestByEmailValidate ($link, &$data, &$returnData){
}

function GetJoinClubRequestByClubValidate ($link, &$data, &$returnData){
}

//---------------------------------------Calling Function --------------------------------------------
function CreateJoinClubRequest ($link, $data, &$returnData){
  InjectClubYearId($link, $data, $returnData);
  CreateJoinClubRequestPermissionCheck($data, $returnData);
  CreateJoinClubRequestValidate($link, $data, $returnData);
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
  }
}

function RespondJoinClubRequest ($link, $data, &$returnData){
  RespondJoinClubRequestPermissionCheck($data, $returnData);
  RespondJoinClubRequestValidate($link, $data, $returnData);
}

function DeleteJoinClubRequest ($link, $data, &$returnData){
  DeleteJoinClubRequestPermissionCheck($data, $returnData);
  DeleteJoinClubRequestValidate($link, $data, $returnData);
}

function GetJoinClubRequestByEmail ($link, $data, &$returnData){
  GetJoinClubRequestByEmailPermissionCheck($data, $returnData);
  GetJoinClubRequestByEmailValidate($link, $data, $returnData);
}

function GetJoinClubRequestByClub ($link, $data, &$returnData){
  GetJoinClubRequestByClubPermissionCheck($data, $returnData);
  GetJoinClubRequestByClubValidate($link, $data, $returnData);
}

//---------------------------------------Helper Function --------------------------------------------
function InjectClubYearId ($link, &$data, &$returnData){
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
?>
