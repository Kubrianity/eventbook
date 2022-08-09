const express = require('express')

const PersonService = require('./services/person-service')
const EventService = require('./services/event-service')
const ReviewService = require( './services/review-service' )


const app = express()
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

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})