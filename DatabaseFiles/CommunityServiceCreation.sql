/*-------------------------------------RELATION TABLES-------------------------------------------*/
CREATE TABLE community_service(
  community_service_id INT NOT NULL AUTO_INCREMENT,
  active_bool BIT(1) NOT NULL DEFAULT 1,
  
  /*TODO data fields*/
  club_year_id INT NOT NULL,
  
  FOREIGN KEY (club_year_id) REFERENCES club_operating_year(club_year_id) ON DELETE CASCADE,
  PRIMARY KEY (community_service_id)
);

CREATE TABLE community_service_removal(
  removal_id INT NOT NULL AUTO_INCREMENT,
  removal_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  remover_id INT NOT NULL,
  community_service_id INT NOT NULL,
  
  FOREIGN KEY (remover_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  FOREIGN KEY (community_service_id) REFERENCES community_service(community_service_id) ON DELETE CASCADE,
  PRIMARY KEY (removal_id) 
);

CREATE TABLE community_service_change_request(
  request_id INT NOT NULL AUTO_INCREMENT,
  request_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  active_bool BIT(1) NOT NULL DEFAULT 1,
  
  community_service_id INT NOT NULL,
  attribute_name VARCHAR(60) NOT NULL,
  new_value VARCHAR(400) NOT NULL, 
  old_value VARCHAR(400) NOT NULL,
  
  FOREIGN KEY (community_service_id) REFERENCES community_service(community_service_id) ON DELETE CASCADE,
  PRIMARY KEY (request_id) 
);

CREATE TABLE community_service_change_request_response(
  response_id INT NOT NULL AUTO_INCREMENT,
  response_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  request_id INT NOT NULL,
  responder_id INT NOT NULL,
  decision BIT(1) NOT NULL, /*0 REJECTED, 1 ACCEPTED*/
  
  FOREIGN KEY (request_id) REFERENCES community_service_change_request(request_id) ON DELETE CASCADE,
  FOREIGN KEY (responder_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  PRIMARY KEY (response_id) 
);

CREATE TABLE community_service_request(
  request_id INT NOT NULL AUTO_INCREMENT,
  request_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  active_bool BIT(1) NOT NULL DEFAULT 1, /*1 pending, 0 responded*/
  community_service_id INT, /*this is the community_service id once the posision is created*/
  
  /*TODO data fields*/
  club_year_id INT NOT NULL,
  requester_id INT NOT NULL,

  FOREIGN KEY (requester_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  FOREIGN KEY (club_year_id) REFERENCES club_operating_year(club_year_id) ON DELETE CASCADE,
  PRIMARY KEY (request_id) 
);

CREATE TABLE community_service_request_response(
  response_id INT NOT NULL AUTO_INCREMENT,
  response_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  request_id INT NOT NULL,
  responder_id INT NOT NULL,
  decision BIT(1) NOT NULL, /*0 REJECTED, 1 ACCEPTED*/
  
  FOREIGN KEY (request_id) REFERENCES community_service_request(request_id) ON DELETE CASCADE,
  FOREIGN KEY (responder_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  PRIMARY KEY (response_id) 
);

CREATE TABLE community_service_request_change_request(
  request_change_id INT NOT NULL AUTO_INCREMENT,
  request_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  active_bool BIT(1) NOT NULL DEFAULT 1,
  
  request_id INT NOT NULL,
  attribute_name VARCHAR(60) NOT NULL,
  new_value VARCHAR(400) NOT NULL, 
  old_value VARCHAR(400) NOT NULL,
  
  FOREIGN KEY (request_id) REFERENCES community_service_request(request_id) ON DELETE CASCADE,
  PRIMARY KEY (request_change_id)
);

CREATE TABLE community_service_request_change_request_response(
  response_id INT NOT NULL AUTO_INCREMENT,
  response_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  request_change_id INT NOT NULL,
  responder_id INT NOT NULL,
  decision BIT(1) NOT NULL, /*0 REJECTED, 1 ACCEPTED*/
  
  FOREIGN KEY (request_change_id) REFERENCES community_service_request_change(request_change_id) ON DELETE CASCADE,
  FOREIGN KEY (responder_id) REFERENCES user_account(account_id) ON DELETE CASCADE,
  PRIMARY KEY (response_id) 
);

