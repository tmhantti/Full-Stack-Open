require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'db.json')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const readDB = () => {
  const rawData = fs.readFileSync(dbPath)
  return JSON.parse(rawData)
}

app.get('/api/persons', (req, res) => {
  const data = readDB()
  res.json(data.persons)
})

app.get('/api/persons/:id', (req, res) => {
  const data = readDB()
  const person = data.persons.find(p => p.id === parseInt(req.params.id))
  person ? res.json(person) : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  const data = readDB()
  const newPerson = {
    id: Math.max(...data.persons.map(p => p.id)) + 1,
    name: body.name,
    number: body.number
  }

  data.persons.push(newPerson)
  fs.writeFileSync(dbPath, JSON.stringify(data))

  res.json(newPerson)
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body
  const data = readDB()
  const personIndex = data.persons.findIndex(p => p.id === parseInt(req.params.id))

  if (personIndex === -1) {
    return res.status(404).json({ error: 'person not found' })
  }

  const updatedPerson = {
    ...data.persons[personIndex],
    name: body.name,
    number: body.number
  }

  data.persons[personIndex] = updatedPerson
  fs.writeFileSync(dbPath, JSON.stringify(data))

  res.json(updatedPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const data = readDB()
  const initialLength = data.persons.length
  data.persons = data.persons.filter(p => p.id !== parseInt(req.params.id))

  if (data.persons.length === initialLength) {
    return res.status(404).json({ error: 'person not found' })
  }

  fs.writeFileSync(dbPath, JSON.stringify(data))
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const currentDate = new Date()
  const data = readDB()
  const noPeople = data.persons.length
  res.send(`<p>Phonebook has info for ${noPeople} people</p>
    <p>${currentDate}</p>`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(3000, () => {    
    console.log('Server running on port 3000');
  });


  