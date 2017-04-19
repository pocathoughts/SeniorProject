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
  //admin or requester
  $query = "SELECT account_id
  FROM club_position_request
  WHERE status = 0 and request_id = " . $data['request_id'];
  $results = queryMultiple($link, $query, "JoinRequest requester query", 5000);
  if (mysqli_num_rows($results) == 0){
    $returnData['errcode'] = 3;
    //TODO proper code
    $returnData['errno'] = 3000;
    $returnData['errstr'] = "request_id doesn't match any pending requests in database";
    exitfnc($returnData);
  }
  $row = mysqli_fetch_array($results);
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  } elseif ($row['account_id'] == $data['account_id']){
    return;
  } else {
    $returnData['errcode'] = 4;
    //TODO proper code
    $returnData['errno'] = 4000;
    $returnData['errstr'] = "Requests can only be delete by Admins or the Requester and only while still pending";
    exitfnc($returnData);
  }
}

function GetJoinClubRequestByUserPermissionCheck ($data, &$returnData){
  //nothing, the users email is used so as long as session is valid, they can access this.
}

function GetJoinClubRequestByEmailPermissionCheck ($data, &$returnData){
  //requester has to be an admin
  if ($data['admin'] == 1){
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

function GetJoinClubRequestByClubPermissionCheck ($data, &$returnData){
  //requester has to be an admin or president of the club
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

//--------------------------------------Validation Methods -----------------------------------------
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
