'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const index = require('./routers/index');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library', err => {
  err ? console.log(err) : console.log('database connected')
});

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);
