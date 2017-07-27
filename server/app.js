'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/dbsentiment', err => {
  err ? console.log(err) : console.log('database connected')
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.use(cors())

// const index = require('./routers/index');
const users = require('./routers/users');
const posts = require('./routers/posts');

app.use('/users',users);
app.use('/posts',posts);

app.listen(process.env.PORT || 3000);
