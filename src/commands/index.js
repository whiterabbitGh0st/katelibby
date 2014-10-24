var commands = {};

commands['help']        = require('./help');
commands['test']        = require('./test');
commands['luck']        = require('./luck');
commands['8ball']       = require('./8ball');
commands['fortune']     = require('./fortune');
commands['google']      = require('./google');
commands['giphy']       = require('./giphy');
commands['join']        = require('./join');
commands['bitstamp']    = require('./bitstamp');
commands['weather']     = require('./weather');
commands['part']        = require('./part');
commands['mustache']    = require('./mustache'); //mustache api is broken, it may be online later
commands['remind']      = require('./remind');  // still working out bugs
commands['xkcd']        = require('./xkcd');
commands['woot']        = require('./woot');
commands['mtastatus']   = require('./mtastatus');

// aliases
commands['w'] = commands['weather'];
commands['g'] = commands['google'];
commands['in'] = commands['remind'];

module.exports = commands;
