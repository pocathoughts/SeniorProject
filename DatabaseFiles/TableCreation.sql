/*TODO AUTO_INCREMENT = ? AND TURN id's INTO UNSIGNED INTS*/
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS club_team;
DROP TABLE IF EXISTS operating_year;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS club_operating_year;
DROP TABLE IF EXISTS club_position;
DROP TABLE IF EXISTS club_position_removal;
DROP TABLE IF EXISTS club_position_request;
DROP TABLE IF EXISTS club_position_request_response;
DROP TABLE IF EXISTS recSport_position;
DROP TABLE IF EXISTS active_session;

SET FOREIGN_KEY_CHECKS = 1;


/*--------------------------------------ENTITY TABLES-------------------------------------------*/
CREATE TABLE club_team (
  club_id INT NOT NULL AUTO_INCREMENT,

  club_name VARCHAR(40) NOT NULL,
  year_start INT,

  PRIMARY KEY (club_id),
  UNIQUE KEY (club_name)
);

CREATE TABLE operating_year (
  year_id INT NOT NULL AUTO_INCREMENT,
  
  year_string CHAR(11) NOT NULL, /*(YEARSTART-YEAREND) ex. (2016-2017)*/
  beginning_year INT NOT NULL,
  
  PRIMARY KEY (year_id)
);

CREATE TABLE user_account (
  creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  account_id INT NOT NULL AUTO_INCREMENT,
  
  email VARCHAR(255) NOT NULL UNIQUE,     /*RFC states that 254 characters are legal as an email*/
  password VARCHAR(20) NOT NULL,
  name VARCHAR(60),
  recSport_acc BIT(1) NOT NULL DEFAULT 0,
  
  PRIMARY KEY (account_id)
); 

/*-------------------------------------RELATION TABLES-------------------------------------------*/

CREATE TABLE club_operating_year (
  club_year_id INT NOT NULL AUTO_INCREMENT,

  club_id INT NOT NULL,
  year_id INT NOT NULL,

  FOREIGN KEY (club_id) REFERENCES club_team(club_id) ON DELETE CASCADE,
  FOREIGN KEY (year_id) REFERENCES operating_year(year_id) ON DELETE CASCADE,
  UNIQUE KEY (club_id, year_id),
  PRIMARY KEY (club_year_id)
);

CREATE TABLE club_position (
  club_position_id INT NOT NULL AUTO_INCREMENT,
  active_bool BIT(1) NOT NULL DEFAULT 1,
  
  account_id INT NOT NULL,
  club_year_id INT NOT NULL,
  position_name VARCHAR(20) NOT NULL,
  president_bool BIT(1) NOT NULL DEFAULT 0,
  
  FOREIGN KEY (account_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  FOREIGN KEY (club_year_id) REFERENCES club_operating_year(club_year_id) ON DELETE CASCADE,
  PRIMARY KEY (club_position_id)
);

CREATE TABLE club_position_removal (
  removal_id INT NOT NULL AUTO_INCREMENT,
  removal_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  remover_id INT NOT NULL,
  club_position_id INT NOT NULL,
  
  FOREIGN KEY (remover_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  FOREIGN KEY (club_position_id) REFERENCES club_position(club_position_id) ON DELETE CASCADE,
  PRIMARY KEY (removal_id) 
);

CREATE TABLE club_position_request (
  request_id INT NOT NULL AUTO_INCREMENT,
  request_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status BIT(1) NOT NULL DEFAULT 0, /*0 pending, 1 responded*/
  club_position_id INT, /*this is the position id once the posision is created*/
  
  account_id INT NOT NULL,
  club_year_id INT NOT NULL,
  position_name VARCHAR(20),
  president_bool BIT(1), 

  FOREIGN KEY (account_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  FOREIGN KEY (club_year_id) REFERENCES club_operating_year(club_year_id) ON DELETE CASCADE,
  PRIMARY KEY (request_id) 
);

CREATE TABLE club_position_request_response (
  response_id INT NOT NULL AUTO_INCREMENT,
  response_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  request_id INT NOT NULL,
  responder_id INT NOT NULL,
  decision BIT(1) NOT NULL, /*0 REJECTED, 1 ACCEPTED*/
  
  FOREIGN KEY (request_id) REFERENCES club_position_request(request_id) ON DELETE CASCADE,
  FOREIGN KEY (responder_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  PRIMARY KEY (response_id) 
);

CREATE TABLE recSport_position (
  temp_permision1 BIT(1) NOT NULL DEFAULT 0,
  account_id INT NOT NULL UNIQUE,
  FOREIGN KEY (account_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  
  PRIMARY KEY (account_id)
);

CREATE TABLE active_session (
  session_id CHAR(32) NOT NULL,
  creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  account_id INT NOT NULL UNIQUE,

  FOREIGN KEY (account_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  PRIMARY KEY (session_id, account_id)
);

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
INSERT INTO user_account (email, password, name, recSport_acc, account_id) VALUES ('user1@ufl.edu', 'pass', 'Example user1', 0, 101);
INSERT INTO user_account (email, password, name, recSport_acc, account_id) VALUES ('requester1@ufl.edu', 'pass', 'Example requester1', 0, 102);

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

