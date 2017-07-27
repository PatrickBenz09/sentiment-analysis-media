const express = require('express')
const router = express.Router()
const postCont = require('../controllers/postController')

router.get('/', postCont.getAllPosts)
router.get('/:id', postCont.getSinglePost)
router.post('/', postCont.addNewPost)
router.put('/:id', postCont.updatePost)
router.delete('/:id', postCont.deletePost)

module.exports = router
