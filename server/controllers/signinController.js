const User = require('../models/User');
const jwt = require('jsonwebtoken')
const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.8'});
// require('dotenv').config()

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}

function signin(req, res, next) {
  let userIdFbFromLogin = req.headers.userId
  User.findOne({
    where: {
      userIdFb: userIdFbFromLogin}
  })
  .then(user=> {
    if(!user) {
      User.create({
        nama: req.headers.nama,
        email: req.headers.email,
        userIdFb: userIdFbFromLogin,
        postlist: ""
      })
      .then(function(){
        var token = jwt.sign({accesstoken: accesstoken, nama: req.headers.nama, useremail:req.headers.email, userIdFb: req.headers.userId}, '24BI04PS');
        res.send(token);
      })
    } else {
      if(user.userIdFb == userIdFb) {
        var token = jwt.sign({accesstoken: accesstoken, nama: user.nama, useremail:user.email, userIdFb: user.userIdFb}, '24BI04PS');
        res.send(token);
      } else {
        res.send('Maaf username atau password salah')
      }
    }
  })
}

module.exports = {
  signin
}
