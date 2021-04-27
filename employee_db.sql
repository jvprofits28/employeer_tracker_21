DROP DATABASE IF EXISTS employee_db:
--create employee_db database
CREATE DATABASE employee_db

USE employee_db;

CREATE TABLE department(
     id INTEGER NOT NULL AUTO_INCREMEN
     name VARCHAR(50) NOT NULL,
     PRIMARY KEY (id)

)
