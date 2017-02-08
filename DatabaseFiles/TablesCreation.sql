DROP TABLE IF EXISTS active_sessions;
DROP TABLE IF EXISTS user_accounts;

/*--------------------------------------ENTITY TABLES-------------------------------------------*/

CREATE TABLE user_accounts (
  email VARCHAR(40) NOT NULL UNIQUE,
  password VARCHAR(15) NOT NULL,	
  creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  request_approval TINYINT(1) DEFAULT 0,
  create_admin_account TINYINT(1) DEFAULT 0,
  account_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (account_ID)
); 

/*-------------------------------------RELATION TABLES-------------------------------------------*/

CREATE TABLE active_sessions (
  session_id CHAR(32) NOT NULL,
  account_id INT NOT NULL UNIQUE,
  FOREIGN KEY (account_id) REFERENCES user_accounts(account_id) ON DELETE CASCADE,
  PRIMARY KEY (session_id, account_id)
);

/*------------------------------------DATABASE POPULATION-------------------------------------------*/

INSERT INTO user_accounts ( email, password, request_approval, create_admin_account, account_id ) Values ('asilcott@ufl.edu', 'pass', 0, 0, 1);
INSERT INTO active_sessions ( session_id, account_id ) Values ('4dcf27753b224f01b03e26652170fdb6', 1);

