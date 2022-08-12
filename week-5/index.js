const express = require('express')
const bodyParser = require('body-parser')

const eventRouter = require('./routes/event')
const personRouter = require('./routes/person')
const reviewRouter = require('./routes/review')

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/events', eventRouter)
app.use('/person', personRouter)
app.use('/comments', reviewRouter)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})