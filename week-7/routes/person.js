const express = require('express')
const router = express.Router()

const isLoggedIn = require('../middleware/ensure-login')

const PersonService = require('../services/person-service')
const EventService = require( '../services/event-service' )
const CommentService = require( '../services/comment-service' )

router.get('/all', async (req, res) => {
  const people = await PersonService.findAll()
  res.render('people', { people })
})

router.get('/all/json', async (req, res) => {
  const users = await PersonService.findAll()
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const person = await PersonService.find(req.params.id)
  if (!person) res.status(404)
  res.render('person-detail', { person })
})

router.delete('/:id', isLoggedIn, async (req, res) => {
  await PersonService.del(req.params.id)
  res.send('Deleted!')
})

// Register for an event
router.post('/register/:eventId', async (req, res) => {
  const person = await PersonService.find(req.body.userId)
  const event = await EventService.find(req.params.eventId)
  await PersonService.register(person, event)
  res.send(person)
})

// Add a new contact
router.post('/contacts/:targetId', isLoggedIn, async (req, res) => {
  const person = await PersonService.find(req.user._id)
  const personToConnect = await PersonService.find(req.params.targetId)
  await PersonService.connect(person, personToConnect)
})

// Make a comment for an event
router.post('/events/:eventId/comments', isLoggedIn, async (req, res) => {
  const person = await PersonService.find(req.user._id)
  const event = await EventService.find(req.params.eventId)
  const comment = await CommentService.add(req.body)
  await PersonService.makeComment(person, comment, event)
})

module.exports = router