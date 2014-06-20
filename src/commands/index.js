var commands = {};

commands['help']        = require('./help');
commands['test']        = require('./test');
commands['luck']        = require('./luck');
commands['8ball']       = require('./8ball');
commands['fortune']     = require('./fortune');
commands['google']      = require('./google');
commands['giphy']       = require('./giphy');
commands['join']        = require('./join');
commands['weather']     = require('./weather');
commands['part']        = require('./part');
//commands['mustache']    = require('./mustache');
//commands['remind']    = require('./remind');

// aliases
commands['w'] = commands['weather'];
commands['g'] = commands['google'];
//commands['in'] = commands['remind'];

module.exports = commands;
