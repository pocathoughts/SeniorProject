<?php

//--------------------------------------Permission Check ---------------------------------------------
function CreateCommunityServiceRequestPermissionCheck($link, $data){
  //TODO club member or admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
  $index = array_search ($data['club_year_id'], $data['permissions']['club_year_id_array']);
  if ( $index === FALSE  ){
    $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User is not associated with Club";
      exitfnc($returnData);
  }  
}
function EditCommunityServiceRequestPermissionCheck($link, $data){
  //TODO club member or admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
  $index = array_search ($data['club_year_id'], $data['permissions']['club_year_id_array']);
  if ( $index === FALSE  ){
    $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User is not associated with Club";
      exitfnc($returnData);
  }
}
function DeleteCommunityServiceRequestPermissionCheck($link, $data){
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
function RespondCommunityServiceRequestPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function EditCommunityServicePermissionCheck($link, $data){
  //TODO club member or admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
  $index = array_search ($data['club_year_id'], $data['permissions']['club_year_id_array']);
  if ( $index === FALSE  ){
    $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User is not associated with Club";
      exitfnc($returnData);
  }
}
function RespondCommunityServiceEditPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function DeleteCommunityServicePermissionCheck($link, $data){
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
function GetCommunityServiceByUserPermissionCheck($link, $data){
  //Null
}
function GetCommunityServiceByEmailPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function GetCommunityServiceByClubPermissionCheck($link, $data){
  //TODO club member or admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
  $index = array_search ($data['club_year_id'], $data['permissions']['club_year_id_array']);
  if ( $index === FALSE  ){
    $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User is not associated with Club";
      exitfnc($returnData);
  }
}
function GetCommunityServiceRequstByUserPermissionCheck($link, $data){
  //Null
}
function GetCommunityServiceRequstByEmailPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function GetCommunityServiceRequstByClubPermissionCheck($link, $data){
  //TODO club member or admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
  $index = array_search ($data['club_year_id'], $data['permissions']['club_year_id_array']);
  if ( $index === FALSE  ){
    $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User is not associated with Club";
      exitfnc($returnData);
  }
}
function GetCommunityServiceEeditRequestByUserPermissionCheck($link, $data){
  //Null
}
function GetCommunityServiceEditRequestByEmailPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function GetCommunityServiceEditRequestByClubPermissionCheck($link, $data){
  //TODO club member or admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
  $index = array_search ($data['club_year_id'], $data['permissions']['club_year_id_array']);
  if ( $index === FALSE  ){
    $returnData['errcode'] = 4;
      //TODO proper code
      $returnData['errno'] = 4000;
      $returnData['errstr'] = "User is not associated with Club";
      exitfnc($returnData);
  }
}
//--------------------------------------Validation Methods -------------------------------------------
function CreateCommunityServiceRequestValidate ($link, &$data){
  InjectClubYearIdByClubYear($link, $data);
  CreateCommunityServiceRequestPermissionCheck($link, $data);
}
function EditCommunityServiceRequestValidate ($link, $data){
  InjectClubYearIdByCommunityServiceID($link, $data);
  EditCommunityServiceRequestPermissionCheck($link, $data);
  //query request by old value, request id, and active_bool
  $select = "SELECT active_bool, " . $data['attribute']  . " FROM community_service_request WHERE request_id =" . $data['request_id'];
  $results = queryMultiple($link, $select, "Com Serv Query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "invalid request id";
    exitfnc($returnData);
  } else {
    $i = 0;
    $att = $data['attribute'];
    if ($rows[$i]['active_bool'] == 0){
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2000;
      $returnData['errstr'] = "request is no longer active and cannot be edited";
      exitfnc($returnData);
    }
    if ($rows[$i][$att] != $data['old_value']){
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2000;
      $returnData['errstr'] = "request has been edited and cannot be changed";
      exitfnc($returnData);
    }
  }
}
function DeleteCommunityServiceRequestValidate ($link, $data){
  InjectClubYearIdByCommunityServiceID($link, $data);
  DeleteCommunityServiceRequestPermissionCheck($link, $data);
  $select = "SELECT active_bool FROM community_service_request WHERE request_id =" . $data['request_id'];
  $results = queryMultiple($link, $select, "Com Serv Query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "invalid request id";
    exitfnc($returnData);
  } else {
    $i = 0;
    $att = $data['attribute'];
    if ($rows[$i]['active_bool'] == 0){
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2000;
      $returnData['errstr'] = "request is no longer active and cannot be deleted";
      exitfnc($returnData);
    }
  }
}
function RespondCommunityServiceRequestValidate ($link, $data){
  InjectClubYearIdByCommunityServiceID($link, $data);
  RespondCommunityServiceRequestPermissionCheck($link, $data);
  $select = "SELECT active_bool FROM community_service_request WHERE request_id =" . $data['request_id'];
  $results = queryMultiple($link, $select, "Com Serv Query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "invalid request id";
    exitfnc($returnData);
  } else {
    $i = 0;
    $att = $data['attribute'];
    if ($rows[$i]['active_bool'] == 0){
      $returnData['errcode'] = 2;
      $returnData['errno'] = 2000;
      $returnData['errstr'] = "request is no longer active and cannot be responded to";
      exitfnc($returnData);
    }
  }
}
function EditCommunityServiceValidate ($link, $data){
  EditCommunityServicePermissionCheck($link, $data);
}
function RespondCommunityServiceEditValidate ($link, $data){
  RespondCommunityServiceEditPermissionCheck($link, $data);
}
function DeleteCommunityServiceValidate ($link, $data){
  DeleteCommunityServicePermissionCheck($link, $data);
}
function GetCommunityServiceByUserValidate ($link, $data){
  GetCommunityServiceByUserPermissionCheck($link, $data);
}
function GetCommunityServiceByEmailValidate ($link, $data){
  GetCommunityServiceByEmailPermissionCheck($link, $data);
}
function GetCommunityServiceByClubValidate ($link, &$data){
  InjectClubYearIdByClubYear($link, $data);
  GetCommunityServiceByClubPermissionCheck($link, $data);
}
function GetCommunityServiceRequstByUserValidate ($link, $data){
  GetCommunityServiceRequstByUserPermissionCheck($link, $data);
}
function GetCommunityServiceRequstByEmailValidate ($link, $data){
  GetCommunityServiceRequstByEmailPermissionCheck($link, $data);
}
function GetCommunityServiceRequstByClubValidate ($link, &$data){
  InjectClubYearIdByClubYear($link, $data);
  GetCommunityServiceRequstByClubPermissionCheck($link, $data);
}
function GetCommunityServiceEditRequestByUserValidate ($link, $data){
  GetCommunityServiceEditRequestByUserPermissionCheck($link, $data);
}
function GetCommunityServiceEditRequestByEmailValidate ($link, $data){
  GetCommunityServiceEditRequestByEmailPermissionCheck($link, $data);
}
function GetCommunityServiceEditRequestByClubValidate ($link, &$data){
  InjectClubYearIdByClubYear($link, $data);
  GetCommunityServiceEditRequestByClubPermissionCheck($link, $data);
}

//---------------------------------------Calling Function --------------------------------------------
function CreateCommunityServiceRequest ($link, $data){
  CreateCommunityServiceRequestValidate($link, $data);
  //insert request CommunityService
  $insert = "INSERT INTO community_service_request (total_hours, club_year_id, requester_id) VALUES (" . $data['total_hours'] . ", " . $data['club_year_id'] . ", " . $data['account_id'] . ")";
  nonQuery($link, $insert, "insert CommunityService request", 5000);
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  $returnData['data']['status'] = 'successful'; 
  exitfnc($returnData);
  //return 0 on success  
}
function EditCommunityServiceRequest ($link, $data){
  EditCommunityServiceRequestValidate($link, $data);
  //require old value in request check it in validate
  //insert CommunityService request
  $update = "UPDATE community_service_request SET " . $data['attribute'] . " = " . $data['new_value'] . " WHERE request_id = " . $data['request_id'];
  nonQuery($link, $update, "edit CommunityService request", 5000);
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  $returnData['data']['status'] = 'successful'; 
  exitfnc($returnData);
  //return 0 on success
}
function DeleteCommunityServiceRequest ($link, $data){
  DeleteCommunityServiceRequestValidate($link, $data);
  //remove the CommunityService request.
  $delete = "DELETE FROM community_service_request WHERE request_id = " . $data['request_id'];
  nonQuery($link, $delete, "delete CommunityService request", 5000);
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  $returnData['data']['status'] = 'successful'; 
  exitfnc($returnData);
  //return 0 on success
}
function RespondCommunityServiceRequest ($link, $data){
  RespondCommunityServiceRequestValidate($link, $data);
  $id = 0;
  if ($data['decision'] == 1){
    //insert into CommunityService
    $insetCommunityService = "INSERT INTO community_service (total_hours, club_year_id) SELECT total_hours, club_year_id FROM community_service_request WHERE request_id = " . $data['request_id'];
    //query
    nonQuery($link, $insetCommunityService, "insert CommunityService request", 5000);
  } 
  
  //insert response audit
  $insertAudit = "INSERT INTO community_service_request_response (request_id, responder_id, decision) VALUES (" . $data['request_id'] . ", " . $data['account_id'] . ", " . $data['decision'] . ")";
  nonQuery($link, $insertAudit, "insert Audit CommunityService request", 5000);
  //update active_bool and CommunityService id
  $update = "UPDATE community_service_request SET active_bool = 0 and community_service_id = " . $id . " WHERE request_id = " . $data['request_id'];
  nonQuery($link, $update, "update CommunityService request", 5000);
  //return 0 on success
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  $returnData['data']['status'] = 'successful'; 
  exitfnc($returnData);
}
function EditCommunityService ($link, $data){
  CreateCommunityServiceRequestValidate($link, $data);
  //insert CommunityService request
  $insert = "INSERT INTO community_service_change_request (community_service_id, attribute_name, new_value, old_value) VALUE (" . $data['community_service_id'] . ", " . $data['attribute'] . ", " . $data['old_value'] . ", " . $data['old_value'] . ")";
  //return 0 on success
}
function RespondCommunityServiceEdit ($link, $data){
  RespondCommunityServiceEditValidate($link, $data);
  //if yes
    //insert changes to CommunityService
  //insert CommunityService change response audit table
  //update active_bool
}
function DeleteCommunityService ($link, $data){
  DeleteCommunityServiceValidateValidate($link, $data);
  //update active_bool
  //insert delete audit table
}
function GetCommunityServiceByUser ($link, $data){
  GetCommunityServiceByUserValidate($link, $data);
  //query CommunityService by user
  $results = queryMultiple($link, $monsterQuery, "gathering request information query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "User " . $data['email'] . " Has No CommunityService events";
    exitfnc($returnData);
  } else {
    $returnData['data']['community_service'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['community_service'][$i]['community_service_id'] = $rows[$i]['community_service_id'];
      $returnData['data']['community_service'][$i]['total_hours'] = $rows[$i]['total_hours'];
      $returnData['data']['community_service'][$i]['club_name'] = $rows[$i]['club_display'];
      if($rows[$i]['active_bool'] == 0){
        $returnData['data']['community_service'][$i]['status'] = 'Deleted';
      } else {
        $returnData['data']['community_service'][$i]['status'] = 'Active';
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}
function GetCommunityServiceByEmail ($link, $data){
  GetCommunityServiceByEmailValidate($link, $data);
  //query CommunityService by email
  $results = queryMultiple($link, $monsterQuery, "gathering request information query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "User " . $data['request_email'] . " Has No CommunityService events";
    exitfnc($returnData);
  } else {
    $returnData['data']['community_service'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['community_service'][$i]['community_service_id'] = $rows[$i]['community_service_id'];
      $returnData['data']['community_service'][$i]['total_hours'] = $rows[$i]['total_hours'];
      $returnData['data']['community_service'][$i]['club_name'] = $rows[$i]['club_display'];
      if($rows[$i]['active_bool'] == 0){
        $returnData['data']['community_service'][$i]['status'] = 'Deleted';
      } else {
        $returnData['data']['community_service'][$i]['status'] = 'Active';
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}
function GetCommunityServiceByClub ($link, $data){
  GetCommunityServiceByClubValidate($link, $data);
  //query CommunityService by club
  $results = queryMultiple($link, $monsterQuery, "gathering request information query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "Club " . $data['club_name'] . " Has No CommunityService events";
    exitfnc($returnData);
  } else {
    $returnData['data']['community_service'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['community_service'][$i]['community_service_id'] = $rows[$i]['community_service_id'];
      $returnData['data']['community_service'][$i]['total_hours'] = $rows[$i]['total_hours'];
      $returnData['data']['community_service'][$i]['club_name'] = $rows[$i]['club_display'];
      if($rows[$i]['active_bool'] == 0){
        $returnData['data']['community_service'][$i]['status'] = 'Deleted';
      } else {
        $returnData['data']['community_service'][$i]['status'] = 'Active';
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}
function GetCommunityServiceRequstByUser ($link, $data){
  GetCommunityServiceRequstByUserValidate($link, $data);
  //query CommunityService REQUEST by user
  $monsterQuery = "SELECT community_service_request.request_id, total_hours, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, active_bool, decision
FROM community_service_request
LEFT OUTER JOIN community_service_request_response ON community_service_request.request_id = community_service_request_response.request_id
INNER JOIN user_account ON user_account.account_id = community_service_request.requester_id
INNER JOIN club_operating_year ON community_service_request.club_year_id = club_operating_year.club_year_id
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
    $returnData['errstr'] = "User " . $data['email'] . " Has No CommunityService events";
    exitfnc($returnData);
  } else {
    $returnData['data']['community_service'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['community_service'][$i]['request_id'] = $rows[$i]['request_id'];
      $returnData['data']['community_service'][$i]['total_hours'] = $rows[$i]['total_hours'];
      $returnData['data']['community_service'][$i]['club_name'] = $rows[$i]['club_display'];
      if($rows[$i]['active_bool'] == 1){
        $returnData['data']['community_service'][$i]['status'] = 'Pending';
      } else {
        if($rows[$i]['decision'] == 1){
          $returnData['data']['community_service'][$i]['status'] = 'Accepted';
        } else {
          $returnData['data']['community_service'][$i]['status'] = 'Rejected';
        }
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}
function GetCommunityServiceRequstByEmail ($link, $data){
  GetCommunityServiceRequstByEmailValidate($link, $data);
  //query CommunityService REQUEST by email
  $email = $data['request_email'];
  $monsterQuery = "SELECT community_service_request.request_id, total_hours, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, active_bool, decision
FROM community_service_request
LEFT OUTER JOIN community_service_request_response ON community_service_request.request_id = community_service_request_response.request_id
INNER JOIN user_account ON user_account.account_id = community_service_request.requester_id
INNER JOIN club_operating_year ON community_service_request.club_year_id = club_operating_year.club_year_id
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
    $returnData['errstr'] = "User " . $data['request_email'] . " Has No CommunityService events";
    exitfnc($returnData);
  } else {
    $returnData['data']['community_service'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['community_service'][$i]['request_id'] = $rows[$i]['request_id'];
      $returnData['data']['community_service'][$i]['total_hours'] = $rows[$i]['total_hours'];
      $returnData['data']['community_service'][$i]['club_name'] = $rows[$i]['club_display'];
      if($rows[$i]['active_bool'] == 1){
        $returnData['data']['community_service'][$i]['status'] = 'Pending';
      } else {
        if($rows[$i]['decision'] == 1){
          $returnData['data']['community_service'][$i]['status'] = 'Accepted';
        } else {
          $returnData['data']['community_service'][$i]['status'] = 'Rejected';
        }
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}
function GetCommunityServiceRequstByClub ($link, $data){
  GetCommunityServiceRequstByClubValidate($link, $data);
  //query CommunityService REQUEST by club
  $monsterQuery = "SELECT community_service_request.request_id, total_hours, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, active_bool, decision
FROM community_service_request
LEFT OUTER JOIN community_service_request_response ON community_service_request.request_id = community_service_request_response.request_id
INNER JOIN user_account ON user_account.account_id = community_service_request.requester_id
INNER JOIN club_operating_year ON community_service_request.club_year_id = club_operating_year.club_year_id
INNER JOIN club_team ON club_operating_year.club_id = club_team.club_id
INNER JOIN operating_year ON club_operating_year.year_id = operating_year.year_id
WHERE club_operating_year.club_year_id = " . $data['club_year_id'];
  $results = queryMultiple($link, $monsterQuery, "gathering request information query", 5000);
  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "Club " . $data['club_name'] . " Has No CommunityService events";
    exitfnc($returnData);
  } else {
    $returnData['data']['community_service'] = array();
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['community_service'][$i]['request_id'] = $rows[$i]['request_id'];
      $returnData['data']['community_service'][$i]['total_hours'] = $rows[$i]['total_hours'];
      $returnData['data']['community_service'][$i]['club_name'] = $rows[$i]['club_display'];
      if($rows[$i]['active_bool'] == 1){
        $returnData['data']['community_service'][$i]['status'] = 'Pending';
      } else {
        if($rows[$i]['decision'] == 1){
          $returnData['data']['community_service'][$i]['status'] = 'Accepted';
        } else {
          $returnData['data']['community_service'][$i]['status'] = 'Rejected';
        }
      }
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
}
function GetCommunityServiceEditRequestByUser ($link, $data){
  GetCommunityServiceEditRequestByUserValidate($link, $data);
  //query CommunityService EDIT reqeust by user.
}
function GetCommunityServiceEditRequestByEmail ($link, $data){
  GetCommunityServiceEditRequestByEmailValidate($link, $data);
  //query CommunityService EDIT reqeust by email.
}
function GetCommunityServiceEditRequestByClub ($link, $data){
  GetCommunityServiceEditRequestByClubValidate($link, $data);
  //query CommunityService EDIT reqeust by club.
}
function InjectClubYearIdByCommunityServiceID ($link, &$data){
  $query = "SELECT club_year_id FROM community_service_request WHERE request_id = " . $data['request_id'];

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