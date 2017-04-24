<?php

/**
 * @author Aaron Silcott
 * @name PositionRequestValidation
 * @copyright 2017
 */

function CreateJoinClubRequestValidate ($link, &$data, &$returnData){

//TODO validate data (inject club_year_id)
  if ( strtolower($data['position']) == 'president'){
    $data['president_bool'] = 1;
  } else {
    $data['president_bool'] = 0;
  }
  InjectClubYearIdByClubYear($link, $data);
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
  InjectClubYearIdByRequest($link, $data);
  RespondJoinClubRequestPermissionCheck($data, $returnData);

   //TODO check that the request exists no longer pending!
  $queryStatus = "SELECT status FROM club_position_request WHERE request_id = " . $data['request_id'];
  $statusResults = querySingle($link, $queryStatus, "Request Status Query", 5000, 5, 5001, "Multiple entries by request_id, contact admin");
  $row = mysqli_fetch_array($statusResults);
  if ($row['status'] == 1){
    $returnData['errcode'] = 2;
    //TODO proper code
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "Request has already been responded too, response rejected";
    exitfnc($returnData);
  }
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

function GetJoinClubRequestByUserValidate ($link, &$data, &$returnData){

  
  //InjectClubYearIdByClubYear($link, $data);

  GetJoinClubRequestByUserPermissionCheck($data, $returnData);
}

function GetJoinClubRequestByEmailValidate ($link, &$data, &$returnData){

  //InjectClubYearIdByClubYear($link, $data);
  GetJoinClubRequestByEmailPermissionCheck($data, $returnData);
}


function GetJoinClubRequestByClubValidate ($link, &$data, &$returnData){
  //do this one
  InjectClubYearIdByClubYear($link, $data);
  GetJoinClubRequestByClubPermissionCheck($data, $returnData);


}




?>