SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE LoginSys;
CREATE DATABASE LoginSys;
use LoginSys;
source AccountSystemCreation.sql;
source CommunityServiceCreation.sql;
source DatabasePopulation.sql;

SET FOREIGN_KEY_CHECKS = 1;