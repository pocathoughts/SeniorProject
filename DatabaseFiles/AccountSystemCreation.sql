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
