const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  post: {
    type: String,
    required: [true, 'post tidak boleh kosong']
  },
  emotion: {
    type: String,
    required: [true, 'emotion tidak boleh kosong']
  },
  song: {
    type: String,
    required: [true, 'song tidak boleh kosong']
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
