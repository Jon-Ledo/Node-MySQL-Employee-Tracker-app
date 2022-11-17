const express = require('express')
const app = express()

// connect DB
const db = require('./db/connect')

const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/api/v1/employees', (req, res) => {
  const sql = `SELECT * FROM employee`

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

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
