const express = require('express')

require('./database-connection')
require('dotenv').config()

const bodyParser = require('body-parser')

const eventRouter = require('./routes/event')
const personRouter = require('./routes/person')
const commentRouter = require('./routes/comment')

const PersonModel = require('./models/person')

const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

const app = express()

passport.serializeUser(PersonModel.serializeUser()) //these should come before initialize and session
passport.deserializeUser(PersonModel.deserializeUser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/events', eventRouter)
app.use('/person', personRouter)
app.use('/comments', commentRouter)

passport.use(new LocalStrategy(PersonModel.authenticate()))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})