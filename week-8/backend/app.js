const express = require('express')
require('dotenv').config()
require('./database-connection')


const bodyParser = require('body-parser')
const cors = require('cors')

const eventRouter = require('./routes/event')
const personRouter = require('./routes/person')
const commentRouter = require('./routes/comment')
const authRouter = require('./routes/auth')

const PersonModel = require('./models/person')

const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

const app = express()

app.use(cors())

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
app.use('/auth', authRouter)

passport.use(new LocalStrategy(PersonModel.authenticate()))

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app