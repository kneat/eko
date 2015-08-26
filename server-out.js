var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

module.exports = function (port, socket){

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
  });

  io.on('connection', function(socket){
    console.log('new subscriber');
  });

  var server = http.listen(port, function(test){
    console.log('GET http://localhost:%s/', server.address().port);
  });

  return function(message){
    io.emit('event', message);
  };
}

