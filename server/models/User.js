const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  nama: {
    type: String,
    required: [true, 'Nama tidak boleh kosong']
  },
  email: {
    type: String,
    required: [true, 'Email tidak boleh kosong']
  },
  postlist: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
