'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const index = require('./routers/index');
const nlp = require('./routers/nlp')


// Mongoose ODM
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library', err => {
  err ? console.log(err) : console.log('database connected')
});


// Socket IO
const server = require('http').Server(app);
const io = require('socket.io')(server);
var connections = [];

io.on('connection', function(socket){
  // console.log('a user connected', socket.handshake.headers['user-agent']);

  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`);
  io.sockets.emit('connected', { connected: connections.length })

  socket.on('create post', function(userName, post){
    io.sockets.emit('new post', { username: userName, post: post })
  });

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log(`A user disconnected: ${connections.length} sockets connected`);
    io.sockets.emit('connected', { connected: connections.length })
  })
});


// Enable CORS ORIGIN
const cors = require('cors')
app.use(cors())


app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.use('/', index);
app.use('/nlp', nlp);

server.listen(process.env.PORT || 3000);
