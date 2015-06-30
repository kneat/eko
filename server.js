var express = require('express');
var bodyParser = require('body-parser');
var echoToConsole = require('./console')

module.exports = function (port){
	var app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));

	app.post('/', echoToConsole, function (req, res) {
	  res.status(204).end();
	});

	var server = app.listen(port, function () {
	  var host = server.address().address;
	  var port = server.address().port;
	  console.log('eko now listening at http://%s:%s', host, port);
	});
}

