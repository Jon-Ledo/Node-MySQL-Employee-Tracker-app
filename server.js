const express = require('express')
const app = express()
const inquirer = require('inquirer')
const prompt = require('./prompt')

// connect DB
const db = require('./db/connect')

const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/api/v1/department', (req, res) => {
  const sql = `SELECT * FROM department`

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

function askPrompt() {
  inquirer.prompt(prompt).then((answers) => {
    if (answers.choice === 'view all departments') {
      // app.get('api/v1/departments', (req, res) => {
      //   console.log(res)
      //   console.log(req)
      // })
    }
  })
}

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))

// WHEN I start the application
// THEN I am presented with the following options:

// view all departments,    --> GET API
// view all roles,          --> GET API
// view all employees,      --> GET API
// add a department,        --> POST API
// add a role,              --> POST API
// add an employee, and     --> POST API
// update an employee role  --> PATCH API

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

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
