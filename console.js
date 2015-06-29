var colors = require('colors');

colors.setTheme({
	fatal: 'magenta',
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	debug: 'white',
	trace: 'grey'
});

module.exports = function echoToConsole(req, res, next)
{
  var formatter = colors[req.body.level.toLowerCase()];
  console.log(formatter('%s|%s'), req.body.logger, req.body.message);
  next();
}
