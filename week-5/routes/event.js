const express = require('express')
const router = express.Router()

const EventService = require('../services/event-service')

router.get('/all', async (req, res) => {
  const events = await EventService.findAll()
  res.render('event', { events })
})

router.get('/:id', async (req, res) => {
  const eventDetail = await EventService.find(req.params.id)
  res.render('event-detail', { eventDetail })
})

router.post('/', async (req, res) => {
  const newEvent = await EventService.add(req.body)
  res.send(newEvent)
})

router.delete('/:id', async (req, res) => {
  await EventService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router