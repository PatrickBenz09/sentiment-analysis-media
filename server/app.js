'use strict'

const express = require('express');
const app = expres();
const bodyParser = require('body-parser');

//const Index = require('./routers/index');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);
