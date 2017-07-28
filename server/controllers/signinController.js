const User = require('../models/User');
const jwt = require('jsonwebtoken')
const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.8'});
// require('dotenv').config()

// const setAccessToken = (req, res, next) => {
//   console.log(`isis token ${JSON.stringify(req.headers)}`);
//   next()
// }

function signin(req, res, next) {
  var token = req.headers.accesstoken
  FB.setAccessToken(req.headers.accesstoken);
  let userIdFbFromLogin = req.headers.id
  console.log(`
    token: ${req.headers.accesstoken}
    id: ${req.headers.id}
    email: ${req.headers.email}
    name: ${req.headers.name}
    `);
  User.findOne({
    where: {
      userIdFb: userIdFbFromLogin}
  })
  .then(user=> {
    if(!user) {
      User.create({
        nama: req.headers.name,
        email: req.headers.email,
        userIdFb: userIdFbFromLogin
      })
      .then(function(){
        var token = jwt.sign({accesstoken: token, nama: req.headers.name, useremail:req.headers.email, userIdFb: req.headers.id}, '24BI04PS');
        res.send(token);
      })
      .catch(err => {
        res.send(err)
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
