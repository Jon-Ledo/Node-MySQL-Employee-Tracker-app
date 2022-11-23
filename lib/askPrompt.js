const inquirer = require('inquirer')
const db = require('../db/connect')
const cTable = require('console.table')
const {
  prompt,
  POSTpromptDept,
  POSTpromptRole,
  POSTpromptEmployee,
} = require('./prompt')
const process = require('process')

// query function for displaying data
function queryDB(sql, params) {
  // sql statement comes from prompt conditionals
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err)
      return
    } else {
      console.log('\n')
      console.log(`------------------------------------------------------`)
    }

    // display info in table
    const table = cTable.getTable(rows)
    console.log(table)

    return askPrompt()
  })
}

// query function for adding data
function POSTqueryDB(sql, params) {
  // sql statement comes from prompt conditionals
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err)
      return
    }
  })
}

// MAIN FUNCTION OF PROGRAM
function askPrompt() {
  inquirer.prompt(prompt).then((answers) => {
    if (answers.choice === 'view all departments') {
      getDepartments()
    }

    if (answers.choice === 'view all roles') {
      getRoles()
    }

    if (answers.choice === 'view all employees') {
      getEmployees()
    }

    if (answers.choice === 'add a department') {
      inquirer.prompt(POSTpromptDept).then((answers) => {
        postdept(answers.department)
      })
    }

    if (answers.choice === 'add a role') {
      inquirer.prompt(POSTpromptRole).then((answers) => {
        postRole(answers)
      })
    }

    if (answers.choice === 'add an employee') {
      inquirer.prompt(POSTpromptEmployee).then((answers) => {
        postEmployee(answers)
      })
    }

    if (answers.choice === 'update an employee') {
      updateEmployee()
    }

    if (answers.choice === 'Exit') {
      process.exit()
    }
  })
}

// Helper Functions
function getDepartments() {
  const sql = `SELECT * FROM department`
  queryDB(sql)
}

function getRoles() {
  const sql = `SELECT * FROM role`
  queryDB(sql)
}

function getEmployees() {
  const sql = `SELECT 	employee.id, 
		    employee.first_name, 
        employee.last_name, 
        role.title AS title,
        role.salary AS salary,
        department.name AS department,
        CONCAT (manager.first_name, " ", manager.last_name) AS manager 
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department 
        ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id;`
  queryDB(sql)
}

function postdept(answer) {
  const sql = `INSERT INTO department (name) VALUES (?)`
  POSTqueryDB(sql, answer)

  getDepartments()
  console.log(`${answer} added to departments`)
}

function postRole(answers) {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
  POSTqueryDB(sql, [answers.title, answers.salary, answers.department_id])

  getRoles()
  console.log(`${answers.title} and related info added into roles`)
}

function postEmployee(answers) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
  POSTqueryDB(sql, [
    answers.first_name,
    answers.last_name,
    answers.role_id,
    answers.manager_id,
  ])

  getEmployees()
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

    // get data for user to select
    const dataArray = rows.map((row) => {
      return {
        id: `${row.id}`,
        name: `${row.first_name} ${row.last_name}`,
      }
    })

    // prompt to select an employee using returned array
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
        // firstName LastName -> for user readability
        const employeeToUpdate = answer.selectedEmployee
        const findID = dataArray.find((employee) => {
          return employee.name === employeeToUpdate
        }) // {name, id}
        const employeeID = +findID.id

        // query to select role from list
        db.query(`SELECT id, title, department_id FROM role`, (err, rows) => {
          if (err) {
            console.log(err)
            return
          }

          const rolesArray = rows.map((row) => {
            return {
              name: `${row.title}`,
              id: `${row.id}`,
              department_id: `${row.department_id}`,
            }
          })

          // prompt to choose pre-existing department
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'selectedDepartment',
                message: `What role should ${employeeToUpdate} be in?`,
                choices: rolesArray,
              },
            ])
            .then((answer) => {
              const newRole = answer.selectedDepartment
              const findRoleID = rolesArray.find((role) => {
                return role.name === newRole
              })

              const roleID = +findRoleID.id

              // pinpoint query using two IDs
              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
              db.query(sql, [roleID, employeeID], (err, rows) => {
                if (err) {
                  return err
                } else {
                  console.log(
                    `------------------------------------------------------`
                  )
                  console.log(`${employeeToUpdate}'s role has been updated`)
                  console.log('\n')
                }
              })

              return getEmployees()
            })
        })
      })
  })
}

module.exports = askPrompt
