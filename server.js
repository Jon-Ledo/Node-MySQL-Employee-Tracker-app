require('dotenv').config()
const express = require('express')
const app = express()

// connect DB
const connectDB = require('./db/connect')

app.use(express.json())

const PORT = process.env.PORT || 3001

const start = async () => {
  try {
    await connectDB(process.env.SECRET_KEY)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
