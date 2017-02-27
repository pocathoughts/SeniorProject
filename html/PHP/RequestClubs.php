<?php
function GetAttachedClubsValidate ($data, &$returnData){
  //validate all data needed data feilds are present (email/account_id) session should be validated already.
}

function GetAttachedClubs ($link, $data, &$returnData){
  $returnData['errno'] = 0;
  $returnData['data']['test'] = 'successful test';
  exitfnc($returnData);
}

?>
