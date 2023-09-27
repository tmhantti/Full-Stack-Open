/* eslint-disable no-undef */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const fs = require('fs').promises

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

// read initial data
let anecdotes = []
async function loadAnecdotes() {
  try {
    const data = await fs.readFile('./src/data/db.json', 'utf8')
    const jsonData = JSON.parse(data)
    anecdotes = jsonData.anecdotes
  } catch (error) {
    console.error('Error reading the initial data', error)
  }
}
loadAnecdotes()

// Routes
app.get('/anecdotes', (req, res) => {
  res.json(anecdotes)
})

app.post('/anecdotes', (req, res) => {
  const newAnecdote = {
    ...req.body,
    id: Math.random().toString(36).substr(2, 9)  // generating a random id
  }
  anecdotes.push(newAnecdote)
  res.json(newAnecdote)
})

app.put('/anecdotes/:id', (req, res) => {
  const id = req.params.id
  const updatedAnecdote = req.body

  anecdotes = anecdotes.map(anecdote =>
    anecdote.id === id ? updatedAnecdote : anecdote
  )

  res.json(updatedAnecdote)
})

app.delete('/anecdotes/:id', (req, res) => {
  const id = req.params.id
  anecdotes = anecdotes.filter(anecdote => anecdote.id !== id)
  res.status(204).end()
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')))

// Any request that doesn't match a previous route or static file can be sent to your React index.html, so it can handle client-side routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`)
})
