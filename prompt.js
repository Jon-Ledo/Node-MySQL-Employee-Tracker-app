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
      'update an employee role',
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

module.exports = { prompt, POSTpromptDept }
