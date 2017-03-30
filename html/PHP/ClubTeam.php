<?php

//--------------------------------------Permission Check --------------------------------------------
function GetAttachedClubsByUserPermissionCheck ($data, &$returnData){
  //Null?
}
function GetAllClubsPermissionCheck ($data, &$returnData){
  //null?
}

//--------------------------------------Validation Methods -----------------------------------------
function GetAttachedClubsByUserValidate ($data, &$returnData){
  GetAttachedClubsByUserPermissionCheck($data, $returnData);
}
function GetAllClubsValidate ($data, &$returnData){
  
  GetAllClubsPermissionCheck($data, $returnData);
}

//---------------------------------------Calling Function --------------------------------------------
function GetAttachedClubsByUser ($link, $data, &$returnData){
  
  GetAttachedClubsByUserValidate($data, $returnData);
  
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

function GetAllClubs ($link, $data, &$returnData){
  GetAllClubsValidate($data, $returnData);
  
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
