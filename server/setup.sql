-- create the databases
CREATE DATABASE IF NOT EXISTS country_info;

-- create the users for each database
CREATE USER 'anyfin'@'%' IDENTIFIED BY 'secret';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `country_info`.* TO 'anyfin'@'%';

FLUSH PRIVILEGES;