const express = require('express')
// Get person service
const PersonService = require('./services/person-service')

const app = express()
app.set('view engine', 'pug')

app.get('/', (req,res) => {
  res.render('index')
})

app.get('/person/all', async (req,res) => {
  const people = await PersonService.findAll()
  res.render('person', { people })
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})