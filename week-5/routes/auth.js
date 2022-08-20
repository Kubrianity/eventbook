const express = require('express')
const router = express.Router()
const PersonModel = require('../models/person')
const PersonService = require('../services/person-service')
const passport = require('passport')

router.get('/login', (req, res, next) => {
    res.render('login')
})
router.post('/register', (req, res, next) => {
    const user = new PersonModel({username : req.body.username})
    PersonModel.register( user, req.body.password, (err, account) => {
        PersonService.add(account)
    })
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))
module.exports = router