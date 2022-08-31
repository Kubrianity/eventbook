const express = require('express')
const router = express.Router()
const PersonModel = require('../models/person')
const PersonService = require('../services/person-service')
const passport = require('passport')

router.get('/register', (req, res, next) => {
    res.render('register')
})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/register', (req, res, next) => {
    const user = new PersonModel({username : req.body.username})
    PersonModel.register( user, req.body.password, (err, account) => {
        if(err) return
        PersonService.add(account)
        res.redirect(`/person/${account._id}`)
    })
})

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureMessage: true 
  }),
  (req, res) => { // when authentication succeeds, the req.user property is set to the authenticated user
    res.redirect(`/person/${req.user._id}`);
});

module.exports = router