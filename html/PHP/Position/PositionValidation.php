<?php

/**
 * @author Aaron Silcott
 * @name PositionValidation
 * @copyright 2017
 */
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



?>