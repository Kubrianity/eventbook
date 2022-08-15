const express = require('express')
const router = express.Router()

const CommentService = require('../services/comment-service')

router.get('/all', async (req, res) => {
  const reviews = await CommentService.findAll()
  res.render('reviews', { reviews })
})

router.get('/:id', async (req, res) => {
  const review = await CommentService.find(req.params.id)
  res.send(review)
})

router.post('/', async (req, res) => {
  const newReview = await CommentService.add(req.body)
  res.send(newReview)
})

router.delete('/:id', async (req, res) => {
  await CommentService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router