'use strict'

const express = require('express');
const router = express.Router();
const songCtlr = require('../controllers/songsController');

router.post('/', songCtlr.get)


module.exports = router;
