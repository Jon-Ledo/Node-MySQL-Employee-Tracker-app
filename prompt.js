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

module.exports = prompt
