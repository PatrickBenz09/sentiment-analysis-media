const User = require('../models/User')
const Post = require('../models/Post')

function getAllUsers(req,res){
  User.find({})
  .populate('postlist', 'post emotion song')
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function getSingleUser(req, res) {
  User.find({_id: req.params.id})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function addNewUser(req, res) {
  User.create({
    nama: req.body.nama,
    email: req.body.email,
    postlist: req.body.postlist
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function pushToPostList(req, res) {
  User.update({
    _id: req.params.id
  },{
    $push: {postlist: req.body.postlist}
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function updateUser(req, res) {
  User.update({_id: req.params.id}, {
    nama: req.body.nama,
    email: req.body.email,
    booklist: req.body.booklist
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function deleteUser(req, res) {
  User.deleteOne({_id: req.params.id})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  addNewUser,
  pushToPostList,
  updateUser,
  deleteUser
}
