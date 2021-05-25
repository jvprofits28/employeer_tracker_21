const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  startQuestions();
});

const startQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Employees",
          "View All Roles",
          "Add Department",
          "Remove Department",
          "Add Employee",
          "Remove Employee",
          "Add Role",
          "Update Employee Role",
          "Quit",
        ],
        name: "start",
      },
    ])
    .then((answers) => {
      switch (answers.start) {
        case "View All Departments":
          showDepartment();
          break;
        case "View All Employees":
          showEmployees();
          break;
        case "View All Roles":
          showRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Remove Department":
          deleteDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          deleteEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Quit":
          console.log("Thank you come back soon!");
          connection.end();
        default:
          break;
      }
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Whats the first name of the Employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "Whats the last name?",
      },
      {
        type: "input",
        name: "role",
        message: "Enter the Employee's role id",
      },
      {
        type: "input",
        name: "managerID",
        message: "Enter the Employee's manager id",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.role,
          manager_id: answers.managerID,
        },
        (err, res) => {
          if (err) throw err;
          startQuestions();
        }
      );
    });
};

const deleteEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "which employee would you like to delete(please provide id)?",
        name: "deleteEmployee",
      },
    ])
    .then((answers) => {
      connection.query(
        "DELETE FROM employee WHERE id = ?",
        answers.deleteEmployee,
        (err, res) => {
          if (err) throw err;
          showEmployees();
          console.log("\n");
          startQuestions();
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Whats the name of the Department that you would like to add?",
        name: "department",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET name = ?",
        answers.department,
        (err, res) => {
          if (err) throw err;
          showDepartment();

          console.log("\n");

          startQuestions();
        }
      );
    });
};

const deleteDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "which department id would you like to delete?",
        name: "deleteDepartment",
      },
    ])
    .then((answers) => {
      connection.query(
        "DELETE FROM department WHERE id = ?",
        answers.deleteDepartment,
        (err, res) => {
          if (err) throw err;
          showDepartment();
          console.log("\n");
          startQuestions();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role to add?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary for this position ?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department id for this role",
        name: "departmentID",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role SET title = ?, salary = ?, department_id = ?",
        answers.role,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          startQuestions();
        }
      );
    });
};

const updateRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Whats the first name of the employee?",
        name: "name",
      },
      {
        type: "input",
        message: "What should the role be updated to (please provide role id)?",
        name: "role",
      },
    ])
    .then((answers) => {
      connection.query(
        `UPDATE role, employee 
        SET title = ? 
        WHERE employee.first_name = ? 
        AND role.id = employee.id`,
        [answers.role, answers.name],
        (err, res) => {
          if (err) throw err;
          showEmployees();
          startQuestions();
        }
      );
    });
};

const showRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  startQuestions();
};

const showEmployees = () => {
  console.log("Showing all employees...\n");
  connection.query(
    `
  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary 
  FROM employee 
  JOIN role 
  ON role.id = employee.role_id 
  JOIN department 
  ON role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startQuestions();
    }
  );
};

const showDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
  });
  startQuestions();
};
