const express = require('express')
const app = express()
const inquirer = require('inquirer')
const { prompt, POSTpromptDept } = require('./prompt')
const cTable = require('console.table')

// connect DB
const db = require('./db/connect')

const PORT = process.env.PORT || 3001

app.use(express.json())

function queryDB(sql, params) {
  // sql statement comes from prompt conditionals
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err)
      return
    }
    // display info in table
    const table = cTable.getTable(rows)
    console.log(table)
    askPrompt()
  })
}

function askPrompt() {
  inquirer.prompt(prompt).then((answers) => {
    // departments
    if (answers.choice === 'view all departments') {
      const sql = `SELECT * FROM department`
      queryDB(sql)
    }
    if (answers.choice === 'view all roles') {
      const sql = `SELECT * FROM role`
      queryDB(sql)
    }
    if (answers.choice === 'view all employees') {
      const sql = `SELECT * FROM employee`
      queryDB(sql)
    }

    // POST a department
    if (answers.choice === 'add a department') {
      // open new prompt
      inquirer.prompt(POSTpromptDept).then((answers) => {
        postdept(answers.department)
      })
    }
    return
  })
}

function postdept(answer) {
  const sql = `INSERT INTO department (name) VALUES (?)`
  queryDB(sql, answer)
}

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))

askPrompt()

// WHEN I start the application
// THEN I am presented with the following options:

// view all departments,    --> GET API
// view all roles,          --> GET API
// view all employees,      --> GET API
// add a department,        --> POST API
// add a role,              --> POST API
// add an employee, and     --> POST API
// update an employee role  --> PATCH API

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
