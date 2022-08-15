const express = require('express')
const router = express.Router()

const CommentService = require('../services/comment-service')

router.get('/all', async (req, res) => {
  const comments = await CommentService.findAll()
  res.render('comments', { comments })
})

router.get('/:id', async (req, res) => {
  const comment = await CommentService.find(req.params.id)
  res.send(comment)
})

router.post('/', async (req, res) => {
  const newComment = await CommentService.add(req.body)
  res.send(newComment)
})

router.delete('/:id', async (req, res) => {
  await CommentService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router