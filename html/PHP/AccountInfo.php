<?

function GetAccountsFromClub ($link, $data, &$returnData){
  //GetAllClubsValidate($data, $returnData);

  $query = "SELECT user_account.name AS display_string FROM user_account WHERE club_team.club_name = $data['club_name']";
  //$query = "SELECT CONCAT(club_team.club_name, ', ', operating_year.year_string) AS display_string FROM club_operating_year, club_team, operating_year WHERE club_team.club_id = club_operating_year.club_id and operating_year.year_id = club_operating_year.year_id ORDER BY display_string";

  //ask aaron what this means
  $results = queryMultiple($link, $query, "All Clubs Query", 5000);

  while ($row = mysqli_fetch_array($results)){
    $rows[] = $row;
  }
  if (sizeof($rows) == 0){
    $returnData['errcode'] = 5;
    $returnData['errno'] = 5011;
    $returnData['errstr'] = "No accout have been detected in database that correspond to that club, contact admin";
    exitfnc($returnData);
  } else {
    for ($i = 0; $i < sizeof($rows); $i++){
      $returnData['data']['account_name'][$i] = $rows[$i][0];
    }
    $returnData['errcode'] = 0;
    $returnData['errno'] = 0;
    exitfnc($returnData);
  }
}

?>
