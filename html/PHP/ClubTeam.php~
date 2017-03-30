<?php

//--------------------------------------Permission Check --------------------------------------------
function GetAttachedClubsByUserPermissionCheck ($data, &$returnData){
}
function GetAllClubsPermissionCheck ($data, &$returnData){
}

//--------------------------------------Validation Methods -----------------------------------------
function GetAttachedClubsByUserValidate ($data, &$returnData){
}
function GetAllClubsValidate ($data, &$returnData){
}

//---------------------------------------Calling Function --------------------------------------------
function GetAttachedClubsByUser ($link, $data, &$returnData){
  GetAttachedClubsByUserPermissionCheck($data, $returnData);
  GetAttachedClubsByUserValidate($data, $returnData);
}
function GetAllClubs ($link, $data, &$returnData){
  GetAllClubsPermissionCheck($data, $returnData);
  GetAllClubsValidate($data, $returnData);
  
  $query = "SELECT CONCAT(club_name, ', ',year_start) FROM club_team";
  if( ! $result = mysqli_query($link,$query) ) {
    $returnData['errcode'] = 5;  
    $returnData['errno'] = 5010;
    $returnData['errstr'] = "Mysql club_team query error: " . mysqli_error($link);
    exitfnc($returnData);
  }

  while ($row = mysqli_fetch_array($result)){
    $rows[] = $row; 
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 5;
    $returnData['errno'] = 5011;
    $returnData['errstr'] = "No Clubs have been detected in database, contact admin";
    exitfnc($returnData);
  } else {
    $i = 0;
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['club_team'][$i] = $rows[$i][0];
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}

?>
