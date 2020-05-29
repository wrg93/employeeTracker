// Dependencies
var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Chandler!93",
  database: "employeeTracker_DB"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) throw err;
  firstPrompt();
});

function firstPrompt(){
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by manager",
                "Add employee",
                "Remove employee",
                "Update employee role",
                "Update employee manager",
                "View all roles",
                "Add role",
                "Remove role"
            ]
        })
        .then(function(answer) {
            switch (answer.action){
            case "View all employees":
                viewAllEmployees();
                break;

            case "View all employees by department":
                viewAllEmployeesByDepartment();
                break;

            case "View all employees by manager":
                viewAllEmployeesByManager();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Remove employee":
                removeEmployee();
                break;

            case "Update employee manager":
                updateEmployeeManager();
                break;

            case "View all roles":
                viewAllRoles();
                break;
            
            case "Add role":
                addRole();
                break;

            case "Remove role":
                removeRole();
                break;
            }
        });
}

function viewAllEmployees(){    
}

function viewAllEmployeesByDepartment(){
}

function viewAllEmployeesByManager(){
}

function addEmployee(){
    connection.query(
        "SELECT * FROM employee RIGHT JOIN role ON employee.role_id = role.role_id", 
        function(err, result){
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "first"
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "last"
                },
                {
                    type: "input",
                    message: "What is the employee's role?",
                    name: "role",
                    choices: function() {
                        let roles = [];
                        result.forEach(role => {
                            roles.push(role.title);
                        })
                        let independents = new Set(roles);
                        roles = [...independents];
                        return roles;
                    }
                }

            ])
        })
}

function removeEmployee(){
}

function updateEmployeeManager(){
}

function viewAllRoles(){
}

function addRole(){
}

function removeRole(){
}