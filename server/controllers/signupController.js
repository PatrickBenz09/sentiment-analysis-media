const User = require('../models/User');

function signupnewuser(req,res){
  User.create({
    user: req.body.username,
    email: req.body.email,
  })
  .then((data) => {
    res.send(data)
    // res.status(200).json({message: 'Success create'})
    console.log('succes create');
  })
  .catch((err) => {
    return res.status(400).send({
      message: err.message
    })
  })
}

module.exports = {
  signupnewuser
}
