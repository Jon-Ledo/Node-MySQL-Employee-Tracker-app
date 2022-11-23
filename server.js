const express = require('express')
const app = express()
const askPrompt = require('./lib/askPrompt')

const PORT = process.env.PORT || 3001

app.use(express.json())

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end()
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
  askPrompt()
})
