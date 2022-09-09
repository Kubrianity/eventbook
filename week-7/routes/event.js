const express = require('express')
const router = express.Router()

const EventService = require('../services/event-service')
const PersonService = require('../services/person-service')
const isLoggedIn = require('../middleware/ensure-login')

router.get('/all', async (req, res) => {
  const events = await EventService.findAll()
  res.render('events', { events })
})

router.get('/all/json', async (req, res) => {
  const events = await EventService.findAll()
  res.send(events)
})

router.get('/:id', async (req, res) => {
  const event = await EventService.find(req.params.id)
  if(!event) res.status(404)
  res.render('event-detail', { event })
})

router.post('/', async (req, res) => {
  const person = await PersonService.find(req.body.userId)
  const event = await EventService.add(req.body.formInfo)
  await PersonService.create(person, event)
})

router.delete('/:id', async (req, res) => {
  await EventService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router