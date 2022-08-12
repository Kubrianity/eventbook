const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')

router.get('/all', async (req, res) => {
  const people = await PersonService.findAll()
  res.render('person', { people: people })
})

router.get('/:id', async (req, res) => {
  const person = await PersonService.find(req.params.id)
  res.render('person-detail', { person: person })
})

router.post('/', async (req, res) => {
  const newPerson = await PersonService.add(req.body)
  res.send(newPerson)
})

router.delete('/:id', async (req, res) => {
  await PersonService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router