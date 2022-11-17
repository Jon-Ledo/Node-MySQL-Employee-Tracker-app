const mysql = require('mysql2')

const connectDB = (password) => {
  return mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: password,
      database: 'employees_db',
    },
    console.log(`Connected to the database.`)
  )
}

module.exports = connectDB
