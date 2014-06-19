var commands = {};

commands['help']        = require('./help');
commands['test']        = require('./test');
commands['luck']        = require('./luck');
commands['8ball']       = require('./8ball');
commands['fortune']     = require('./fortune');
commands['google']      = require('./google');
commands['giphy']       = require('./giphy');
commands['join']        = require('./join');

// aliases
commands['g'] = commands['google'];

module.exports = commands;
