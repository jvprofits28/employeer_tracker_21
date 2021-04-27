const inquirer = require("inquirer");
const mysql = require("mysql");
// inquirer prompt with questions
const connection = mysql.createConnection({
  hots: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "",
});
const startQuestions = () => [
  {
    type: "list",
    message: "what would you like to do?",
    choices: [
      "View all employees",
      "View all employees by department",
      "View employees by role",
      "Add an employee",
      "Add a role",
      "Add a department",
      "Update employee role",
      "Quit",
    ],
    name: "choices",
  },
];
