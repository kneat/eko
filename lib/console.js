var colors = require('colors');

colors.setTheme({
  fatal: 'magenta',
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'white',
  trace: 'grey'
});

module.exports = function echoToConsole(event)
{
  var formatter = colors[event.level.toLowerCase()];
  console.log(formatter('%s|%s'), event.logger, event.message);
}
