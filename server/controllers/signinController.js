const User = require('../models/User');
const jwt = require('jsonwebtoken')
require('dotenv').config()

function signin(req, res, next) {
  let username = req.body.username
  let password = req.body.password

  User.findOne({
    where: {username: username}
  })
  .then(user=> {
    // var saltUserLogin = user.salt
    // var passwordUserLogin = req.body.password

    // var getPasswordUser = genSalt.createHash(passwordUserLogin, saltUserLogin)
    // console.log('ini password dari form    ',getPasswordUser);
    // console.log('ini password dari database',user.password);
    if(user.email == email) {
      var token = jwt.sign({accesstoken: accesstoken, username: user.name, useremail:user.email}, process.env.SECRET);
      res.send(token);
    } else {
      res.send('Maaf username atau password salah')
    }
  })
  .catch(err => {
    return res.status(400).send({
      message: err.message
    })
  })
}

module.exports = {
  signin
}
