'use strict'

const express = require('express');
const router = express.Router();
const nlpLogic = require('../controllers/nlpController');

router.post('/', nlpLogic);

module.exports = router;
