<?php

/**
 * @author Aaron Silcott
 * @name PositionRequestFunctions
 * @copyright 2017
 */
 
 
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

function GetJoinClubRequestByUser ($link, $data, &$returnData){

  GetJoinClubRequestByUserValidate($link, $data, $returnData);
  //query
  $monsterQuery = "SELECT club_position_request.request_id, user_account.name, user_account.email, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, club_position_request.position_name, club_position_request.status, club_position_request_response.decision
FROM club_position_request
LEFT OUTER JOIN club_position_request_response ON club_position_request.request_id = club_position_request_response.request_id
INNER JOIN user_account ON user_account.account_id = club_position_request.account_id
INNER JOIN club_operating_year ON club_position_request.club_year_id = club_operating_year.club_year_id
INNER JOIN club_team ON club_operating_year.club_id = club_team.club_id
INNER JOIN operating_year ON club_operating_year.year_id = operating_year.year_id
WHERE user_account.account_id = " . $data['account_id'];
  $results = queryMultiple($link, $monsterQuery, "gathering request information query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "User " . $data['email'] . " Has No Requests";
    exitfnc($returnData);
  } else {
    $returnData['data']['requests'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['requests'][$i]['request_id'] = $rows[$i]['request_id'];
      $returnData['data']['requests'][$i]['name'] = $rows[$i]['name'];
      $returnData['data']['requests'][$i]['email'] = $rows[$i]['email'];
      $returnData['data']['requests'][$i]['club_name'] = $rows[$i]['club_display'];
      $returnData['data']['requests'][$i]['position'] = $rows[$i]['position_name'];
      if($rows[$i]['status'] == 0){
        $returnData['data']['requests'][$i]['status'] = 'Pending';
      } else {
        if ($rows[$i]['decision'] == 0){
          $returnData['data']['requests'][$i]['status'] = 'Rejected';
        } else {
          $returnData['data']['requests'][$i]['status'] = 'Accepted';
        }
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}

function GetJoinClubRequestByEmail ($link, $data, &$returnData){

  GetJoinClubRequestByEmailValidate($link, $data, $returnData);
  //query
  $email = $data ['request_email'];
  $monsterQuery = "SELECT club_position_request.request_id, user_account.name, user_account.email, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, club_position_request.position_name, club_position_request.status, club_position_request_response.decision
FROM club_position_request
LEFT OUTER JOIN club_position_request_response ON club_position_request.request_id = club_position_request_response.request_id
INNER JOIN user_account ON user_account.account_id = club_position_request.account_id
INNER JOIN club_operating_year ON club_position_request.club_year_id = club_operating_year.club_year_id
INNER JOIN club_team ON club_operating_year.club_id = club_team.club_id
INNER JOIN operating_year ON club_operating_year.year_id = operating_year.year_id
WHERE user_account.email = '" . $email . "'";
  $results = queryMultiple($link, $monsterQuery, "gathering request information query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "user " . $email . " Has No Requests";
    exitfnc($returnData);
  } else {
    $returnData['data']['requests'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['requests'][$i]['request_id'] = $rows[$i]['request_id'];
      $returnData['data']['requests'][$i]['name'] = $rows[$i]['name'];
      $returnData['data']['requests'][$i]['email'] = $rows[$i]['email'];
      $returnData['data']['requests'][$i]['club_name'] = $rows[$i]['club_display'];
      $returnData['data']['requests'][$i]['position'] = $rows[$i]['position_name'];
      if($rows[$i]['status'] == 0){
        $returnData['data']['requests'][$i]['status'] = 'Pending';
      } else {
        if ($rows[$i]['decision'] == 0){
          $returnData['data']['requests'][$i]['status'] = 'Rejected';
        } else {
          $returnData['data']['requests'][$i]['status'] = 'Accepted';
        }
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}

function GetJoinClubRequestByClub ($link, $data, &$returnData){

  GetJoinClubRequestByClubValidate($link, $data, $returnData);
  //query
  $monsterQuery = "SELECT club_position_request.request_id, user_account.name, user_account.email, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, club_position_request.position_name, club_position_request.status, club_position_request_response.decision
FROM club_position_request
LEFT OUTER JOIN club_position_request_response ON club_position_request.request_id = club_position_request_response.request_id
INNER JOIN user_account ON user_account.account_id = club_position_request.account_id
INNER JOIN club_operating_year ON club_position_request.club_year_id = club_operating_year.club_year_id
INNER JOIN club_team ON club_operating_year.club_id = club_team.club_id
INNER JOIN operating_year ON club_operating_year.year_id = operating_year.year_id
WHERE club_position_request.club_year_id =" . $data ['club_year_id'];
  $results = queryMultiple($link, $monsterQuery, "gathering request information query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "Club " . $data['club_year_id'] . " Has No Requests";
    exitfnc($returnData);
  } else {
    $returnData['data']['requests'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['requests'][$i]['request_id'] = $rows[$i]['request_id'];
      $returnData['data']['requests'][$i]['name'] = $rows[$i]['name'];
      $returnData['data']['requests'][$i]['email'] = $rows[$i]['email'];
      $returnData['data']['requests'][$i]['club_name'] = $rows[$i]['club_display'];
      $returnData['data']['requests'][$i]['position'] = $rows[$i]['position_name'];
      if($rows[$i]['status'] == 0){
        $returnData['data']['requests'][$i]['status'] = 'Pending';
      } else {
        if ($rows[$i]['decision'] == 0){
          $returnData['data']['requests'][$i]['status'] = 'Rejected';
        } else {
          $returnData['data']['requests'][$i]['status'] = 'Accepted';
        }
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}

//---------------------------------------Helper Function --------------------------------------------
function InjectClubYearIdByClubYear ($link, &$data){
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
