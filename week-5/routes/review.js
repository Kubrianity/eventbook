const express = require('express')
const router = express.Router()

const ReviewService = require('../services/review-service')

router.get('/all', async (req, res) => {
  const comments = await ReviewService.findAll()
  res.render('comment', { comments })
})

router.get('/:id', async (req, res) => {
  const commentDetail = await ReviewService.find(req.params.id)
  res.send(commentDetail)
})

router.post('/', async (req, res) => {
  const newComment = await ReviewService.add(req.body)
  res.send(newComment)
})

router.delete('/:id', async (req, res) => {
  await ReviewService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router