#!/usr/bin/env node
var program = require('commander');
var server = require('./server');
var echoToConsole = require('./lib/console')

program
  .version(require('./package.json').version)
  .description('Repeat log events recieved over HTTP on the console.')
  .option('-p, --port <num>', 'port to listen on, default is 4560', 4560)
  .parse(process.argv);

server(program.port, echoToConsole);