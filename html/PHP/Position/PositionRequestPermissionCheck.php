<?php

/**
 * @author Aaron Silcott
 * @name PositionRequestPermissionCheck
 * @copyright 2017
 */

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



?>