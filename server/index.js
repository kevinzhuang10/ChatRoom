
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var socket = require('socket.io');

app.use(express.static(__dirname + '/../client/dist'));

app.get('/test', function (req, res) {
  res.send('hello world');
});

var server = app.listen(3000, function() {
  console.log('listening on port 3000!');
});

var io = socket(server);

io.on('connection', (socket) => {
  console.log('make socket connection');

  socket.on('sent', (messageObj) => {
    console.log('got some mess,', messageObj);
    io.sockets.emit('newMessage', messageObj);
  });

})