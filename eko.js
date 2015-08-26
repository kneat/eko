#!/usr/bin/env node
var program = require('commander');
var serverIn = require('./server-in');
var serverOut = require('./server-out');
var echoToConsole = require('./lib/console')

program
  .version(require('./package.json').version)
  .description(
      'Repeat log events recieved over HTTP on the console and socket.io.')
  .option('-p, --port <num>', 'port to listen on, default is 4560', 4560)
  .option('-b, --broadcast-port <num>', 'port to broadcast on, default is 4561', 4561)
  .parse(process.argv);

serverIn(program.port, echoToConsole);
serverOut(program.broadcastPort);