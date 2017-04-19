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
function CreateCommunityServiceRequestValidate ($link, $data){
  InjectClubYearIdByClubYear($link, $data);
  CreateCommunityServiceRequestPermissionCheck($link, $data);
}
function EditCommunityServiceRequestValidate ($link, $data){
  InjectClubYearIdByCommunityServiceID($link, $data);
  EditCommunityServiceRequestPermissionCheck($link, $data);
}
function DeleteCommunityServiceRequestValidate ($link, $data){
  DeleteCommunityServiceRequestPermissionCheck($link, $data);
}
function RespondCommunityServiceRequestValidate ($link, $data){
  RespondCommunityServiceRequestPermissionCheck($link, $data);
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
function GetCommunityServiceByClubValidate ($link, $data){
  GetCommunityServiceByClubPermissionCheck($link, $data);
}
function GetCommunityServiceRequstByUserValidate ($link, $data){
  GetCommunityServiceRequstByUserPermissionCheck($link, $data);
}
function GetCommunityServiceRequstByEmailValidate ($link, $data){
  GetCommunityServiceRequstByEmailPermissionCheck($link, $data);
}
function GetCommunityServiceRequstByClubValidate ($link, $data){
  GetCommunityServiceRequstByClubPermissionCheck($link, $data);
}
function GetCommunityServiceEditRequestByUserValidate ($link, $data){
  GetCommunityServiceEditRequestByUserPermissionCheck($link, $data);
}
function GetCommunityServiceEditRequestByEmailValidate ($link, $data){
  GetCommunityServiceEditRequestByEmailPermissionCheck($link, $data);
}
function GetCommunityServiceEditRequestByClubValidate ($link, $data){
  GetCommunityServiceEditRequestByClubPermissionCheck($link, $data);
}

//---------------------------------------Calling Function --------------------------------------------
function CreateCommunityServiceRequest ($link, $data){
  CreateCommunityServiceRequestValidate($link, $data);
  //insert request CommunityService
  $insert = "INSERT INTO community_service_request (total_hours, club_year_id) VALUES (" . $data['total_hours'] . ", " . $data['club_year_id'] . ")";
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
  $insert = "UPDATE community_service SET " . $data['attribute'] . " = " . $data['new_value'] . " where community_service_id = " . $data['community_service_id'];
  //return 0 on success
}
function DeleteCommunityServiceRequest ($link, $data){
  DeleteCommunityServiceRequestValidate($link, $data);
  //remove the CommunityService request.
  $delete = "DELETE FROM community_service WHERE request_id = " . $data['request_id'];
  //return 0 on success
}
function RespondCommunityServiceRequest ($link, $data){
  RespondCommunityServiceRequestValidate($link, $data);
  $id = 0;
  if ($data['decision'] == 1){
    //insert into CommunityService
    $insetCommunityService = "INSERT INTO community_service (DATA) SELECT DATA FROM community_service_request WHERE request_id = " . $data['request_id'];
    //query
  } 
  
  //insert response audit
  $insertAudit = "INSERT INTO community_service_request_response (request_id, responder_id, decision) VALUES (" . $data['request_id'] . ", " . $data['account_id'] . ", " . $data['decision'] . ")";
  //update active_bool and CommunityService id
  $update = "UPDATE community_service_request SET active_bool = 0 and community_service_id = " . $id . "WHERE request_id = " . $data['request_id'];
  //return 0 on success
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
}
function GetCommunityServiceByEmail ($link, $data){
  GetCommunityServiceByEmailValidate($link, $data);
  //query CommunityService by email
}
function GetCommunityServiceByClub ($link, $data){
  GetCommunityServiceByClubValidate($link, $data);
  //query CommunityService by club
}
function GetCommunityServiceRequstByUser ($link, $data){
  GetCommunityServiceRequstByUserValidate($link, $data);
  //query CommunityService REQUEST by user
}
function GetCommunityServiceRequstByEmail ($link, $data){
  GetCommunityServiceRequstByEmailValidate($link, $data);
  //query CommunityService REQUEST by email
}
function GetCommunityServiceRequstByClub ($link, $data){
  GetCommunityServiceRequstByClubValidate($link, $data);
  //query CommunityService REQUEST by club
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


?>