const express = require('express')

require('./database-connection')
const bodyParser = require('body-parser')

const eventRouter = require('./routes/event')
const personRouter = require('./routes/person')
const commentRouter = require('./routes/comment')

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/events', eventRouter)
app.use('/person', personRouter)
app.use('/comments', commentRouter)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})