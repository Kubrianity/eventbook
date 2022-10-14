const express = require('express')
const router = express.Router()

const CommentService = require('../services/comment-service')
const isLoggedIn = require('../middleware/ensure-login')

router.get('/all', async (req, res) => {
  const comments = await CommentService.findAll()
  res.render('comments', { comments })
})

router.get('/:id', async (req, res) => {
  const comment = await CommentService.find(req.params.id)
  if(!comment) res.status(404)
  res.send(comment)
})

router.delete('/:id', isLoggedIn, async (req, res) => {
  await CommentService.del(req.params.id)
  res.send('Deleted!')
})

module.exports = router