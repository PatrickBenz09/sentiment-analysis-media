const jwt = require('jsonwebtoken');
// require('dotenv').config()

let verifytokenforLogin = (req, res, next) => {
  let roleauth = jwt.verify(req.headers.token, '24BI04PS')
  console.log(roleauth);
  if (roleauth.accesstoken != '' || roleauth.accesstoken != null) {
    next()
  } else {
    res.send('Maaf anda tidak memiliki akses ke halaman ini')
  }
}

module.exports = {
  verifytokenforLogin
}
