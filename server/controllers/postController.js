const Post = require('../models/Post')

function getAllPosts(req,res) {
  Post.find({})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

function getSinglePost(req, res) {
  Post.find({_id: req.params.id})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

function addNewPost(req, res) {
  Post.create({
    post: req.body.post,
    emotion: req.body.emotion,
    song: req.body.song,
    email: req.body.email
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

function updatePost(req,res) {
  Post.update({_id: req.params.id}, {
    post: req.body.post,
    emotion: req.body.emotion,
    song: req.body.song
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

function deletePost(req,res) {
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getAllPosts,
  getSinglePost,
  addNewPost,
  updatePost,
  deletePost
}
