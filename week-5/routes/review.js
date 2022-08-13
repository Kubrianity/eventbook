const express = require('express')
const router = express.Router()

const ReviewService = require('../services/review-service')

router.get('/all', async (req, res) => {
  const reviews = await ReviewService.findAll()
  res.render('reviews', { reviews })
})

router.get('/:id', async (req, res) => {
  const review = await ReviewService.find(req.params.id)
  res.send(review)
})

router.post('/', async (req, res) => {
  const newReview = await ReviewService.add(req.body)
  res.send(newReview)
})

router.delete('/:id', async (req, res) => {
  await ReviewService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router