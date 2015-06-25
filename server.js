var express = require('express');
var app = express();

app.post('/', function (req, res) {
  res.status(204).end();
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});