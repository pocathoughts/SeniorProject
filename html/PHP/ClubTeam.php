<?php

//--------------------------------------Permission Check --------------------------------------------
function RemoveClubPositionByUserPermissionCheck($link, $data){
  //null sumbitting user is allowed
}
function RemoveClubPositionByEmailPermissionCheck($link, $data){
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
function GetClubPositionByUserPermissionCheck($link, $data){
  //null submitting user is allowed
}
function GetClubPositionByEmailPermissionCheck($link, $data){
  //IF ADMIN, ACCEPT
  if ($data['admin'] == 1){
    //echo 'allowed';
    return;
  }
}
function GetClubPositionByClubPermissionCheck($link, $data){
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

function GetAttachedClubsByUserPermissionCheck($link, $data){
  //null submitting user is allowed
}
function GetAllClubsPermissionCheck($link, $data){
  //no permission check required for this one.
}

//--------------------------------------Validation Methods -----------------------------------------
function RemoveClubPositionByUserValidate($link, &$data){
  InjectClubYearIdByClubYear($link, $data);
  RemoveClubPositionByUserPermissionCheck($link, $data);
  //TODO VALIDATE INPUT FEILDS
  //TODO CHECK IF ACTIVE POSITION STILL EXISTS
}

function RemoveClubPositionByEmailValidate($link, &$data){
  InjectClubYearIdByClubYear($link, $data);
  RemoveClubPositionByEmailPermissionCheck($link, $data);
  //TODO VALIDATE INPUT FEILDS
  //TODO CHECK IF ACTIVE POSITION STILL EXISTS
}

function GetClubPositionByUserValidate($link, $data){
  GetClubPositionByUserPermissionCheck($link, $data);
  //TODO VALIDATE INPUT FEILDS
  //TODO CHECK IF ACTIVE POSITION STILL EXISTS
}

function GetClubPositionByEmailValidate($link, $data){
  GetClubPositionByEmailPermissionCheck($link, $data);
  //TODO VALIDATE INPUT FEILDS
  //TODO CHECK THAT EMAIL IS VALID ACCOUNT
}

function GetClubPositionByClubValidate($link, &$data){
  InjectClubYearIdByClubYear($link, $data);
  GetClubPositionByClubPermissionCheck($link, $data);
  //TODO VALIDATE INPUT FEILDS
}

function GetAttachedClubsByUserValidate($link, $data){
  GetAttachedClubsByUserPermissionCheck($link, $data);
  //TODO VALIDATE INPUT FEILDS
}
function GetAllClubsValidate($link, $data){
  GetAllClubsPermissionCheck($link, $data);
  //null, nothing to validate
}

//---------------------------------------Calling Function --------------------------------------------
function RemoveClubPositionByUser($link, $data){
  RemoveClubPositionByUserValidate($link, $data);
  $insert = "INSERT INTO club_position_removal(club_position_id, remover_id)
SELECT club_position_id, 101
FROM club_position
WHERE active_bool = 1 and account_id = " . $data['account_id'] . " and club_year_id = " . $data['club_year_id'] . " and position_name = '" . $data['position'] . "'";
  echo $insert;
  nonQuery($link, $insert, "Insert Removal Audit", 5000);

  $update = "UPDATE club_position
SET active_bool = 0
WHERE active_bool = 1 and account_id = " . $data['account_id'] . " and club_year_id = " . $data['club_year_id'] . " and position_name = '" . $data['position'] . "'";
  nonQuery($link, $update, "update position active status", 5000);
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  $returnData['data']['status'] = 'successful'; 
  exitfnc($returnData);
}
function RemoveClubPositionByEmail($link, $data){
  RemoveClubPositionByEmailValidate($link, $data);
  $email = $data['position_email'];
  $insert = "INSERT INTO club_position_removal(club_position_id, remover_id)
SELECT club_position.club_position_id, 101
FROM club_position
INNER JOIN user_account ON user_account.account_id = club_position.account_id
WHERE active_bool = 1 and email = '" . $email . "' and club_year_id = " . $data['club_year_id'] . " and position_name = '" . $data['position'] . "'";
  nonQuery($link, $insert, "Insert Removal Audit", 5000);

  $update = "UPDATE club_position
INNER JOIN user_account ON user_account.account_id = club_position.account_id
SET active_bool = 0
WHERE active_bool = 1 and email = '" . $email . "' and club_year_id = " . $data['club_year_id'] . " and position_name = '" . $data['position'] . "'";
  nonQuery($link, $update, "update position active status", 5000);
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  $returnData['data']['status'] = 'successful'; 
  exitfnc($returnData);

}
function GetClubPositionByUser($link, $data){
  GetClubPositionByUserValidate($link, $data);
  $query = "SELECT user_account.name, user_account.email, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, club_position.position_name
FROM club_position
INNER JOIN user_account ON user_account.account_id = club_position.account_id
INNER JOIN club_operating_year ON club_position.club_year_id = club_operating_year.club_year_id
INNER JOIN club_team ON club_operating_year.club_id = club_team.club_id
INNER JOIN operating_year ON club_operating_year.year_id = operating_year.year_id
WHERE club_position.active_bool = 1 and club_position.account_id = " . $data['account_id'];
  $results = queryMultiple($link,$query,"Club Position By User Query", 5000);
  
  if (mysqli_num_rows($results) == 0){
    //TODO speak with kev about how to rep this.
  }
  $returnData['data']['positions'] = array();
  $i = 0;
  while ($row = mysqli_fetch_array($results)){
    $returnData['data']['positions'][$i]['name'] = $row['name'];
    $returnData['data']['positions'][$i]['email'] = $row['email'];
    $returnData['data']['positions'][$i]['club_name'] = $row['club_display'];
    $returnData['data']['positions'][$i]['position'] = $row['position_name'];
    $i++;
  }
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  exitfnc($returnData);
}
function GetClubPositionByEmail($link, $data){
  GetClubPositionByEmailValidate($link, $data);
  $email = $data['position_email'];
  $query = "SELECT user_account.name, user_account.email, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, club_position.position_name
FROM club_position
INNER JOIN user_account ON user_account.account_id = club_position.account_id
INNER JOIN club_operating_year ON club_position.club_year_id = club_operating_year.club_year_id
INNER JOIN club_team ON club_operating_year.club_id = club_team.club_id
INNER JOIN operating_year ON club_operating_year.year_id = operating_year.year_id
WHERE club_position.active_bool = 1 and user_account.email = '" . $email . "'";
  $results = queryMultiple($link,$query,"Club Position By Email Query", 5000);
  
  if (mysqli_num_rows($results) == 0){
    //TODO speak with kev about how to rep this.
  }
  $returnData['data']['positions'] = array();
  $i = 0;
  while ($row = mysqli_fetch_array($results)){
    $returnData['data']['positions'][$i]['name'] = $row['name'];
    $returnData['data']['positions'][$i]['email'] = $row['email'];
    $returnData['data']['positions'][$i]['club_name'] = $row['club_display'];
    $returnData['data']['positions'][$i]['position'] = $row['position_name'];
    $i++;
  }
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  exitfnc($returnData);
}
function GetClubPositionByClub($link, $data){
  //Club Year Id no injected
  GetClubPositionByClubValidate($link, $data);
  $query = "SELECT user_account.name, user_account.email, CONCAT(club_team.club_name, ', ', operating_year.year_string) AS club_display, club_position.position_name
FROM club_position
INNER JOIN user_account ON user_account.account_id = club_position.account_id
INNER JOIN club_operating_year ON club_position.club_year_id = club_operating_year.club_year_id
INNER JOIN club_team ON club_operating_year.club_id = club_team.club_id
INNER JOIN operating_year ON club_operating_year.year_id = operating_year.year_id
WHERE club_position.active_bool = 1 and club_operating_year.club_year_id = " . $data['club_year_id'];
  $results = queryMultiple($link,$query,"Club Position By Club Query", 5000);
  
  if (mysqli_num_rows($results) == 0){
    //TODO speak with kev about how to rep this.
  }
  $returnData['data']['positions'] = array();
  $i=0;
  while ($row = mysqli_fetch_array($results)){
    $returnData['data']['positions'][$i]['name'] = $row['name'];
    $returnData['data']['positions'][$i]['email'] = $row['email'];
    $returnData['data']['positions'][$i]['club_name'] = $row['club_display'];
    $returnData['data']['positions'][$i]['position'] = $row['position_name'];
    $i++;
  }
  $returnData['errcode'] = 0;
  $returnData['errno'] = 0;
  exitfnc($returnData);
}
    
function GetAttachedClubsByUser ($link, $data){
  GetAttachedClubsByUserValidate($link, $data);
  
  $query = "SELECT CONCAT(club_team.club_name, ', ', operating_year.year_string) AS display_string FROM club_operating_year, club_team, operating_year, club_position WHERE club_team.club_id = club_operating_year.club_id and operating_year.year_id = club_operating_year.year_id and club_position.account_id = " . $data['account_id'] . " and club_position.club_year_id = club_operating_year.club_year_id ORDER BY display_string; ";
  $results = queryMultiple($link, $query, "Clubs attached to Account Query", 5000);

  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 2;
    $returnData['errno'] = 2000;
    $returnData['errstr'] = "User not attached to any Clubs";
    exitfnc($returnData);
  } else {
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['club_team'][$i] = $rows[$i][0];
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}

function GetAllClubs ($link, $data){
  GetAllClubsValidate($link, $data);

  $query = "SELECT CONCAT(club_team.club_name, ', ', operating_year.year_string) AS display_string FROM club_operating_year, club_team, operating_year WHERE club_team.club_id = club_operating_year.club_id and operating_year.year_id = club_operating_year.year_id ORDER BY display_string";
  $results = queryMultiple($link, $query, "All Clubs Query", 5000);

  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 5;
    $returnData['errno'] = 5011;
    $returnData['errstr'] = "No Clubs have been detected in database, contact admin";
    exitfnc($returnData);
  } else {
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['club_team'][$i] = $rows[$i][0];
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}

?>
