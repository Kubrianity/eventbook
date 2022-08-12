const express = require('express')
const router = express.Router()

const EventService = require('../services/event-service')

router.get('/all', async (req, res) => {
  const events = await EventService.findAll()
  res.render('event', { events })
})

router.get('/:id', async (req, res) => {
  const eventDetail = await EventService.find(req.params.id)
  res.render('event-detail', { data: eventDetail })
})

module.exports = router