var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (port, output){
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.post('/', function (req, res) {
  	output(req.body);
    res.status(204).end();
  });

  var server = app.listen(port, function () {
    console.log('POST http://localhost:%s/', server.address().port);
  });
}

