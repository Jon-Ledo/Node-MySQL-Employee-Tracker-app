const prompt = [
  {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do? (use arrow keys)',
    choices: [
      'view all departments',
      'view all roles',
      'view all employees',
      'add a department',
      'add a role',
      'add an employee',
      'update an employee',
      'Exit',
    ],
  },
]

const POSTpromptDept = [
  {
    type: 'input',
    name: 'department',
    message: 'What department are you adding?',
    validate: (value) => {
      if (!value) {
        console.log('Please enter a department name')
        return false
      } else return true
    },
  },
]

const POSTpromptRole = [
  {
    type: 'input',
    name: 'title',
    message: 'What role are you adding?',
    validate: (value) => {
      if (!value) {
        console.log('Please enter a role name')
        return false
      } else return true
    },
  },
  {
    type: 'number',
    name: 'salary',
    message: 'Starting hourly rate? (ex. 18.50)',
    validate: (value) => {
      if (isNaN(value)) {
        console.log('Please enter starting hourly rate? (ex. 18.50)')
        return false
      } else return true
    },
  },
  {
    type: 'number',
    name: 'department_id',
    message: 'What department is the role for? (use ID # only)',
    validate: (value) => {
      if (isNaN(value)) {
        console.log("Please enter the department's ID ")
        return false
      } else return true
    },
  },
]

const POSTpromptEmployee = [
  {
    type: 'input',
    name: 'first_name',
    message: 'Enter first name',
    validate: (value) => {
      if (!value) {
        console.log('Please enter a first name')
        return false
      } else return true
    },
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Enter last name',
    validate: (value) => {
      if (!value) {
        console.log('Please enter a last name')
        return false
      } else return true
    },
  },
  {
    type: 'number',
    name: 'role_id',
    message: 'Enter the role ID',
    validate: (value) => {
      if (isNaN(value)) {
        console.log('Please enter the role ID')
        return false
      } else return true
    },
  },
  {
    type: 'number',
    name: 'manager_id',
    message: "Enter direct manager's ID",
    validate: (value) => {
      if (isNaN(value)) {
        console.log("Please enter the manager's ID")
        return false
      } else return true
    },
  },
]

module.exports = { prompt, POSTpromptDept, POSTpromptRole, POSTpromptEmployee }
