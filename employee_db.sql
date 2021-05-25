DROP DATABASE IF EXISTS employee_db;
--create employee_db database
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL,
     PRIMARY KEY (id)

);
CREATE TABLE role (

id INT NOT NULL AUTO_INCREMENT,

title VARCHAR(100) NOT NULL,

salary DECIMAL NOT NULL,

department_id INT NOT NULL,

PRIMARY KEY (id)

);

CREATE TABLE employee (

id INT NOT NULL AUTO_INCREMENT,

first_name VARCHAR(100) NOT NULL,

last_name VARCHAR(100) NOT NULL,

role_id INT (100) NOT NULL,

manager_id INT,

PRIMARY KEY (id)

);
INSERT INTO department (name) 
VALUES ('Sales');
INSERT INTO department (name) 
VALUES ('Finance');
INSERT INTO department (name) 
VALUES ('Management');

INSERT INTO role (title, salary, department_id)
 VALUES ('Sales Associate', 40000, 1);
INSERT INTO role (title, salary, department_id) 
VALUES ('Finance Supervisor', 45000, 2);
INSERT INTO role (title, salary, department_id) 
VALUES ('Floor Supervisor', 50000, 3);
INSERT INTO role (title, salary, department_id) 
VALUES ('Assistant Manager', 55000, 4);
INSERT INTO role (title, salary, department_id) 
VALUES ('General Manager', 60000, 5);

