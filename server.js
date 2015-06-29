var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');

colors.setTheme({
	fatal: 'magenta',
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	debug: 'white',
	trace: 'grey'

});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/', function (req, res) {
  formatter = colors[req.body.level.toLowerCase()];
  console.log(formatter('%s|%s'), req.body.logger, req.body.message);
  res.status(204).end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('eko now listening at http://%s:%s', host, port);
});