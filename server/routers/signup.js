const express = require('express');
const router = express.Router();
const signupCont = require('../controllers/signupController')

router.post('/', signupCont.signupnewuser);

module.exports = router;
