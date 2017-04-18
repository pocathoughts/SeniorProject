<?php

//--------------------------------------Permission Check ---------------------------------------------
function CreateITEMRequestPermissionCheck($link, $data){
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
function EditITEMRequestPermissionCheck($link, $data){
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
function DeleteITEMRequestPermissionCheck($link, $data){
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
function RespondITEMRequestPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function EditITEMPermissionCheck($link, $data){
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
function RespondITEMEditPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function DeleteITEMPermissionCheck($link, $data){
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
function GetITEMByUserPermissionCheck($link, $data){
  //Null
}
function GetITEMByEmailPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function GetITEMByClubPermissionCheck($link, $data){
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
function GetITEMRequstByUserPermissionCheck($link, $data){
  //Null
}
function GetITEMRequstByEmailPermissionCheck($link, $data){
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function GetITEMRequstByClubPermissionCheck($link, $data){
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
function GetITEMEeditRequestByUserPermissionCheck($link, $data){
  //Null
}
function GetITEMEditRequestByEmailPermissionCheck($link, $data)
  //TODO admin
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function GetITEMEditRequestByClubPermissionCheck($link, $data){
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
function CreateITEMRequestValidate ($link, $data){
  CreateITEMRequestPermissionCheck($link, $data);
}
function EditITEMRequestValidate ($link, $data){
  EditITEMRequestPermissionCheck($link, $data);
}
function DeleteITEMRequestValidate ($link, $data){
  DeleteITEMRequestPermissionCheck($link, $data);
}
function RespondITEMRequestValidate ($link, $data){
  RespondITEMRequestPermissionCheck($link, $data);
}
function EditITEMValidate ($link, $data){
  EditITEMPermissionCheck($link, $data);
}
function RespondITEMEditValidate ($link, $data){
  RespondITEMEditPermissionCheck($link, $data);
}
function DeleteITEMValidate ($link, $data){
  DeleteITEMPermissionCheck($link, $data);
}
function GetITEMByUserValidate ($link, $data){
  GetITEMByUserPermissionCheck($link, $data);
}
function GetITEMByEmailValidate ($link, $data){
  GetITEMByEmailPermissionCheck($link, $data);
}
function GetITEMByClubValidate ($link, $data){
  GetITEMByClubPermissionCheck($link, $data);
}
function GetITEMRequstByUserValidate ($link, $data){
  GetITEMRequstByUserPermissionCheck($link, $data);
}
function GetITEMRequstByEmailValidate ($link, $data){
  GetITEMRequstByEmailPermissionCheck($link, $data);
}
function GetITEMRequstByClubValidate ($link, $data){
  GetITEMRequstByClubPermissionCheck($link, $data);
}
function GetITEMEditRequestByUserValidate ($link, $data){
  GetITEMEditRequestByUserPermissionCheck($link, $data);
}
function GetITEMEditRequestByEmailValidate ($link, $data){
  GetITEMEditRequestByEmailPermissionCheck($link, $data);
}
function GetITEMEditRequestByClubValidate ($link, $data){
  GetITEMEditRequestByClubPermissionCheck($link, $data);
}

//---------------------------------------Calling Function --------------------------------------------
function CreateITEMRequest ($link, $data){
  CreateITEMRequestValidate($link, $data);
  //insert request item
  $insert = "INSERT INTO ITEMT_request (DATA) VALUES (TODO)";
  //return 0 on success  
}
function EditITEMRequest ($link, $data){
  EditITEMRequestValidate($link, $data);
  //require old value in request check it in validate
  //insert item request
  $insert = "UPDATE ITEMT SET " . $data['attribute'] . " = " . $data['new_value'] . " where ITEMT_id = " . $data['ITEMT_id'];
  //return 0 on success
}
function DeleteITEMRequest ($link, $data){
  DeleteITEMRequestValidate($link, $data);
  //remove the item request.
  $delete = "DELETE FROM ITEMT WHERE request_id = " . $data['request_id'];
  //return 0 on success
}
function RespondITEMRequest ($link, $data){
  RespondITEMRequestValidate($link, $data);
  $id = 0;
  if ($data['decision'] == 1){
    //insert into item
    $insetItem = "INSERT INTO ITEMT (DATA) SELECT DATA FROM ITEMT_request WHERE request_id = " . $data['request_id'];
    //query
  } 
  
  //insert response audit
  $insertAudit = "INSERT INTO ITEMT_request_response (request_id, responder_id, decision) VALUES (" . $data['request_id'] . ", " . $data['account_id'] . ", " . $data['decision'] . ")";
  //update active_bool and item id
  $update = "UPDATE ITEMT_request SET active_bool = 0 and ITEMT_id = " . $id . "WHERE request_id = " . $data['request_id'];
  //return 0 on success
}
function EditITEM ($link, $data){
  CreateITEMRequestValidate($link, $data);
  //insert item request
  $insert = "INSERT INTO ITEMT_change_request (ITEMT_id, attribute_name, new_value, old_value) VALUE (" . $data['ITEMT_id'] . ", " . $data['attribute'] . ", " . $data['old_value'] . ", " . $data['old_value'] . ")";
  //return 0 on success
}
function RespondITEMEdit ($link, $data){
  RespondITEMEditValidate($link, $data);
  //if yes
    //insert changes to item
  //insert item change response audit table
  //update active_bool
}
function DeleteITEM ($link, $data){
  DeleteITEMValidateValidate($link, $data);
  //update active_bool
  //insert delete audit table
}
function GetITEMByUser ($link, $data){
  GetITEMByUserValidate($link, $data);
  //query ITEM by user
}
function GetITEMByEmail ($link, $data){
  GetITEMByEmailValidate($link, $data);
  //query ITEM by email
}
function GetITEMByClub ($link, $data){
  GetITEMByClubValidate($link, $data);
  //query ITEM by club
}
function GetITEMRequstByUser ($link, $data){
  GetITEMRequstByUserValidate($link, $data);
  //query ITEM REQUEST by user
}
function GetITEMRequstByEmail ($link, $data){
  GetITEMRequstByEmailValidate($link, $data);
  //query ITEM REQUEST by email
}
function GetITEMRequstByClub ($link, $data){
  GetITEMRequstByClubValidate($link, $data);
  //query ITEM REQUEST by club
}
function GetITEMEditRequestByUser ($link, $data){
  GetITEMEditRequestByUserValidate($link, $data);
  //query ITEM EDIT reqeust by user.
}
function GetITEMEditRequestByEmail ($link, $data){
  GetITEMEditRequestByEmailValidate($link, $data);
  //query ITEM EDIT reqeust by email.
}
function GetITEMEditRequestByClub ($link, $data){
  GetITEMEditRequestByClubValidate($link, $data);
  //query ITEM EDIT reqeust by club.
}


?>