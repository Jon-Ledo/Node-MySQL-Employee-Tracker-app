require('dotenv').config()
const mysql = require('mysql2')

const connectDB = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.SECRET_KEY,
    database: 'employees_db',
  },
  console.log(`Connected to the database.`)
)

module.exports = connectDB
