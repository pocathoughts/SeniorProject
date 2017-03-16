<?php

//--------------------------------------Permission Check --------------------------------------------
function CreateJoinClubRequestPermissionCheck ($data, &$returnData){
}

function RespondJoinClubRequestPermissionCheck ($data, &$returnData){
}

function DeleteJoinClubRequestPermissionCheck ($data, &$returnData){
}

function GetJoinClubRequestByEmailPermissionCheck ($data, &$returnData){
}

function GetJoinClubRequestByClubPermissionCheck ($data, &$returnData){
}

//--------------------------------------Validation Methods -----------------------------------------
function CreateJoinClubRequestValidate ($data, &$returnData){
}

function RespondJoinClubRequestValidate ($data, &$returnData){
}

function DeleteJoinClubRequestValidate ($data, &$returnData){
}

function GetJoinClubRequestByEmailValidate ($data, &$returnData){
}

function GetJoinClubRequestByClubValidate ($data, &$returnData){
}

//---------------------------------------Calling Function --------------------------------------------
function CreateJoinClubRequest ($link, $data, &$returnData){
  CreateJoinClubRequestPermissionCheck($data, $returnData);
  CreateJoinClubRequestValidate($data, $returnData);
}

function RespondJoinClubRequest ($link, $data, &$returnData){
  RespondJoinClubRequestPermissionCheck($data, $returnData);
  RespondJoinClubRequestValidate($data, $returnData);
}

function DeleteJoinClubRequest ($link, $data, &$returnData){
  DeleteJoinClubRequestPermissionCheck($data, $returnData);
  DeleteJoinClubRequestValidate($data, $returnData);
}

function GetJoinClubRequestByEmail ($link, $data, &$returnData){
  GetJoinClubRequestByEmailPermissionCheck($data, $returnData);
  GetJoinClubRequestByEmailValidate($data, $returnData);
}

function GetJoinClubRequestByClub ($link, $data, &$returnData){
  GetJoinClubRequestByClubPermissionCheck($data, $returnData);
  GetJoinClubRequestByClubValidate($data, $returnData);
}
?>
