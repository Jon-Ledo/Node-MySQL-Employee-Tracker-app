const express = require('express')
const app = express()
const inquirer = require('inquirer')
const {
  prompt,
  POSTpromptDept,
  POSTpromptRole,
  POSTpromptEmployee,
} = require('./prompt')
const cTable = require('console.table')

// connect DB
const db = require('./db/connect')

const PORT = process.env.PORT || 3001

app.use(express.json())

function queryDB(sql, ...params) {
  // sql statement comes from prompt conditionals
  db.query(sql, ...params, (err, rows) => {
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
    // GET all departments
    if (answers.choice === 'view all departments') {
      const sql = `SELECT * FROM department`
      queryDB(sql)
    }

    // GET all roles
    if (answers.choice === 'view all roles') {
      const sql = `SELECT * FROM role`
      queryDB(sql)
    }

    // GET all employees
    if (answers.choice === 'view all employees') {
      const sql = `SELECT * FROM employee`
      queryDB(sql)
    }

    // POST a department
    if (answers.choice === 'add a department') {
      inquirer.prompt(POSTpromptDept).then((answers) => {
        postdept(answers.department)
      })
    }

    // POST a role
    if (answers.choice === 'add a role') {
      inquirer.prompt(POSTpromptRole).then((answers) => {
        postRole(answers)
      })
    }

    // POST an employee
    if (answers.choice === 'add an employee') {
      inquirer.prompt(POSTpromptEmployee).then((answers) => {
        postEmployee(answers)
      })
    }

    // UPDATE an employee
    if (answers.choice === 'update an employee') {
      updateEmployee()
    }
    return
  })
}

function postdept(answer) {
  const sql = `INSERT INTO department (name) VALUES (?)`
  queryDB(sql, answer)
  console.log(`${answer} added to departments`)
}

function postRole(answers) {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
  queryDB(sql, [answers.title, answers.salary, answers.department_id])
  console.log(`${answers.title} and related info added into roles`)
}

function postEmployee(answers) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
  queryDB(sql, [
    answers.first_name,
    answers.last_name,
    answers.role_id,
    answers.manager_id,
  ])
  console.log(
    `New employee, ${answers.first_name} ${answers.last_name} added to database`
  )
}

function updateEmployee() {
  db.query(`SELECT first_name, last_name, id FROM employee`, (err, rows) => {
    if (err) {
      console.log(err)
      return
    }

    const dataArray = rows.map((row) => {
      return {
        id: `${row.id}`,
        name: `${row.first_name} ${row.last_name}`,
      }
    })

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedEmployee',
          message: 'Who would you like to update?',
          choices: dataArray,
        },
      ])
      .then((answer) => {
        const employeeToUpdate = answer.selectedEmployee // firstName LastName -> for user readability
        const findID = dataArray.find((employee) => {
          return employee.name === employeeToUpdate
        }) // {name, id}
        const id = +findID.id
        console.log(typeof id, id)

        // query to select role from list
        // new inquirer prompt

        // inquirer
        //   .prompt([
        //     {
        //       type: 'input',
        //       name: 'newRole',
        //       message: "What is this employee's new role?",
        //     },
        //   ])
        //   .then((answer) => {
        //     const newRole = answer.newRole

        //     // pinpoint query using id

        //     const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        //     db.query(sql, [44, id])
        //   })
      })
  })
}

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))

askPrompt()

// update an employee role  --> PATCH API

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
