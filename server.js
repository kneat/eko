#!/usr/bin/env node
var program = require('commander')
var express = require('express');
var bodyParser = require('body-parser');
var echoToConsole = require('./console')

program
  .version('0.0.1')
  .description('Repeat log events recieved over HTTP on the console.')
  .option('-p, --port <num>', 'port to listen on, default is 4560', 4560)
  .parse(process.argv);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/', echoToConsole, function (req, res) {
  res.status(204).end();
});

var server = app.listen(program.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('eko now listening at http://%s:%s', host, port);
});