const express = require('express')
const bodyParser = require('body-parser')

const PersonService = require('./services/person-service')
const EventService = require('./services/event-service')
const ReviewService = require( './services/review-service' )
const Person = require( './models/person' )

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.get('/', (req,res) => {
  res.render('index')
})

// Get all people
app.get('/person/all', async (req,res) => {
  const people = await PersonService.findAll()
  res.render('person', { people })
})
// Get all events
app.get('/events/all', async (req, res) => {
  const events = await EventService.findAll()
  res.render('event', { events })
})
// Get all comments
app.get('/comments/all', async (req, res) => {
  const comments = await ReviewService.findAll()
  res.render('comment', { comments })
})

// Get a specific person
app.get('/person/:id', async (req, res) => {
  const id = req.params.id
  const personDetail = await PersonService.find(id)
  res.send(personDetail)
})
// Get a specific event
app.get('/events/:id', async (req, res) => {
  const id = req.params.id
  const eventDetail = await EventService.find(id)
  res.send(eventDetail)
})
// Get a specific comment
app.get('/comments/:id', async (req, res) => {
  const id = req.params.id
  const commentDetail = await ReviewService.find(id)
  res.send(commentDetail)
})

// Create a new person
app.post('/person', async (req, res) => {
  const newPerson = await PersonService.add(req.body)
  res.send(newPerson)
})
// Create a new event
app.post('/events', async (req, res) => {
  const newEvent = await EventService.add(req.body)
  res.send(newEvent)
})
// Create a new comment
app.post('/comments', async (req, res) => {
  const newComment = await ReviewService.add(req.body)
  res.send(newComment)
})

// Delete a person
app.delete('/person/:id', async (req, res) => {
  await PersonService.del(req.params.id)
  res.send('Deleted!')
})
// Delete an event
app.delete('/events/:id', async (req, res) => {
  await EventService.del(req.params.id)
  res.send('Deleted!')
})
// Delete a comment
app.delete('/comments/:id', async (req, res) => {
  await ReviewService.del(req.params.id)
  res.send('Deleted!')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})