var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('new subscriber');
});

module.exports = function (port, socket){

  var server = http.listen(port, function(test){
    console.log('GET http://localhost:%s/', server.address().port);
  });

  return function(message){
    io.emit('event', message);
  };
}

