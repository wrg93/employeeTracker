// Dependencies
var express = require("express");
var mysql = require("mysql");

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
                "Add department",
                "Add role",
                "Add employee",
                "Update employee"
            ]
        })
        .then(function(answer) {
            switch (answer.action){
            case "Add deparment":
                addDepartment();
                break;

            case "Add role":
                addRole();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Update employee":
                updateEmployee();
                break;
            }
        });
}
