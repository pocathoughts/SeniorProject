SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS club_team;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS club_position;
DROP TABLE IF EXISTS club_position_request;
DROP TABLE IF EXISTS club_position_request_response;
DROP TABLE IF EXISTS recSport_position;
DROP TABLE IF EXISTS active_session;

SET FOREIGN_KEY_CHECKS = 1;


/*--------------------------------------ENTITY TABLES-------------------------------------------*/
CREATE TABLE club_team (
  club_name VARCHAR(40) NOT NULL,
  year_start INT NOT NULL,
  club_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (club_id),
  UNIQUE KEY (club_name, year_start),
  CHECK (year_start > 1990 AND year_start < 2050)
);

CREATE TABLE user_account (
  email VARCHAR(255) NOT NULL UNIQUE,     /*RFC states that 254 characters are legal as an email*/
  password VARCHAR(20) NOT NULL,
  name VARCHAR(60),
  creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  recSport_acc BIT(1) NOT NULL DEFAULT 0,
  account_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (account_id)
); 

/*-------------------------------------RELATION TABLES-------------------------------------------*/

CREATE TABLE club_position (
  account_id INT NOT NULL,
  club_id INT NOT NULL,
  position_name VARCHAR(20) NOT NULL,
  president_bool BIT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (account_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  FOREIGN KEY (club_id) REFERENCES club_team(club_id) ON DELETE CASCADE,
  PRIMARY KEY (account_id, club_id)
);

CREATE TABLE club_position_request (
  request_id INT NOT NULL AUTO_INCREMENT,
  request_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status BIT(1) NOT NULL DEFAULT 0, /*0 pending, 1 responded*/
  
  requester_id INT NOT NULL,

  club_id INT NOT NULL,
  position_name VARCHAR(20),
  president_bool BIT(1), 

  FOREIGN KEY (requester_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  FOREIGN KEY (club_id) REFERENCES club_team(club_id) ON DELETE CASCADE,
  PRIMARY KEY (request_id) 
);

CREATE TABLE club_position_request_response (
  response_id INT NOT NULL AUTO_INCREMENT,
  request_id INT NOT NULL,
  responder INT NOT NULL,
  response_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  decision BIT(1) NOT NULL, /*0 REJECTED, 1 ACCEPTED*/
  
  FOREIGN KEY (request_id) REFERENCES club_position_request(request_id) ON DELETE CASCADE,
  FOREIGN KEY (responder) REFERENCES user_account(account_id) ON DELETE CASCADE,
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
  account_id INT NOT NULL UNIQUE,
  previous_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  PRIMARY KEY (session_id, account_id)
);

/*------------------------------------DATABASE DEFAULT POPULATION-------------------------------------------*/

INSERT INTO club_team (club_name, year_start, club_id) VALUES ('Mens Lacrosse',2017, 1000);
INSERT INTO club_team (club_name, year_start, club_id) VALUES ('Womens Lacrosse', 2017, 1010);

INSERT INTO user_account ( email, password, name, recSport_acc, account_id ) VALUES ('asilcott@ufl.edu', 'pass', 'Aaron Silcott', 0, 100);
INSERT INTO user_account ( email, password, name, recSport_acc, account_id ) VALUES ('example1@ufl.edu', 'pass', 'Example Account1', 0, 101);
INSERT INTO user_account ( email, password, name, recSport_acc, account_id ) VALUES ('example2@ufl.edu', 'pass', 'Example Account2', 0, 102);

INSERT INTO club_position (account_id, club_id, position_name, president_bool) VALUES ('100', 1000, 'President', 1);
INSERT INTO club_position (account_id, club_id, position_name, president_bool) VALUES ('100', 1010, 'stuff', 0);
INSERT INTO club_position (account_id, club_id, position_name, president_bool) VALUES ('101', 1000, 'Vice President', 0);

INSERT INTO active_session ( session_id, account_id ) VALUES ('4dcf27753b224f01b03e26652170fdb6', 100);

