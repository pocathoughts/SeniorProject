
/*------------------------------------DATABASE DEFAULT POPULATION-------------------------------------------*/

/*----Create Operating Year "2015, 2016" & "2016, 2017"----*/
INSERT INTO operating_year (year_string, beginning_year, year_id) VALUES ('(2016-2017)', 2016, 1000);
INSERT INTO operating_year (year_string, beginning_year, year_id) VALUES ('(2015-2016)', 2015, 1001);

/*----create club team Mens Lacrosse and Womens Lacrosse----*/
INSERT INTO club_team (club_name, year_start, club_id) VALUES ('Mens Lacrosse',2017, 1000);
INSERT INTO club_team (club_name, year_start, club_id) VALUES ('Womens Lacrosse', 2017, 1010);

/*----Associate Mens Lacrosse with 2015 and 2016 operating years, and womens with 2016----*/
INSERT INTO club_operating_year (club_id, year_id, club_year_id) VALUES (1000, 1000, 1000);
INSERT INTO club_operating_year (club_id, year_id, club_year_id) VALUES (1000, 1001, 1001);
INSERT INTO club_operating_year (club_id, year_id, club_year_id) VALUES (1010, 1000, 1002);

/*----Creating 3 default accounts, asilcott will be admin, user1 will be added to a club, and requester will be just a request----*/
INSERT INTO user_account (email, password, name, recSport_acc, account_id) VALUES ('asilcott@ufl.edu', 'pass', 'Aaron Silcott', 1, 100);
INSERT INTO user_account (email, password, name, recSport_acc, account_id) VALUES ('kmarin@ufl.edu', 'pass', 'Kevin Marin', 1, 101);
INSERT INTO user_account (email, password, name, recSport_acc, account_id) VALUES ('c@ufl.edu', 'pass', 'stuff', 1, 102);
INSERT INTO user_account (email, password, name, recSport_acc, account_id) VALUES ('user1@ufl.edu', 'pass', 'Example user1', 0, 103);
INSERT INTO user_account (email, password, name, recSport_acc, account_id) VALUES ('requester1@ufl.edu', 'pass', 'Example requester1', 0, 104);

/*----Adding user and asilcot to Mens Lacrosse----*/
INSERT INTO club_position (account_id, club_year_id, position_name, president_bool) VALUES ('100', 1000, 'President', 1);
INSERT INTO club_position (account_id, club_year_id, position_name, president_bool) VALUES ('101', 1000, 'VP', 0);
INSERT INTO club_position (account_id, club_year_id, position_name, president_bool) VALUES ('101', 1001, 'President', 1);

/*----Adding requester's request to Join----*/
INSERT INTO club_position_request(account_id, club_year_id, position_name, president_bool) VALUES ('102', 1000, 'secretary', 0);

/*----Add active session for asilcott----*/
INSERT INTO active_session (session_id, account_id) VALUES ('4dcf27753b224f01b03e26652170fdb6', 100);

SELECT * FROM club_team;
SELECT * FROM operating_year;
SELECT * FROM user_account;
SELECT * FROM club_operating_year;
SELECT * FROM club_position;
SELECT * FROM club_position_request;
SELECT * FROM club_position_request_response;
SELECT * FROM recSport_position;
SELECT * FROM active_session;

SELECT * FROM community_service;
SELECT * FROM community_service_removal;
SELECT * FROM community_service_change_request;
SELECT * FROM community_service_change_request_response;
SELECT * FROM community_service_request;
SELECT * FROM community_service_request_response;
SELECT * FROM community_service_request_change;
