/*
 * bot.js
 *  Description: This is a Node.js IRC bot used for wh.iterabb.it
 *  Authors: Beau Bouchard (@Beaubouchard)
 *           Turner ()
 *           Eric Norris (@ericnorris)
 *
 */

var http        = require('http');
var url         = require('url');
var path        = require('path');
var irc         = require('irc');
var config      = require('./config');
var commands    = require('./commands/');

var commandChar = config.commandChar;
var commandPattern = new RegExp('^' + commandChar + '(\\w+) ?(.*)');

var urlRegex = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');

var KateLibby = function() {
    this.config = config;

    setupCommands.call(this);
    setupIRCBot.call(this);
    setupMessageHandler.call(this);
}

KateLibby.prototype.say = function(to, message) {
    this.client.say(to, message);
}

function setupCommands() {
    this.commands = commands;
}

function setupIRCBot() {
    this.client = new irc.Client(config.server, config.userName, config);

    var katelibby = this;
    this.client.on('registered', function(message) {
        katelibby.nick = message.args[0];
    });
}

function setupMessageHandler() {
    var katelibby = this;
    this.client.on('message', function(from, to, text, message) {
        var target = (to === katelibby.nick ? from : to);
        var match = text.match(commandPattern);
        if (match) {
            command = match[1];
            args = match[2];

            if (command in katelibby.commands) {
                var result = katelibby.commands[command](katelibby, target, from, args);
                if (result !== undefined) {
                    katelibby.say(target, result.toString());
                }
            }
        } else if (isURL(text)) {
            getTitle(text, function(title) {
                katelibby.say(target, '[' + title + ']');
            });
        }
    });
}

// --- Util ---
function isURL(str) {
    return str.length < 2083 && urlRegex.test(str);
}

function getTitle(incurl, callback) {
    var ahost = url.parse(incurl).hostname;
    var apath = url.parse(incurl).pathname;
    var urlOpts = {host: ahost, path: apath, port: '80'};
    var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/ig;
    http.get(urlOpts, function (response) {
        response.on('data', function (chunk) {
            var str=chunk.toString();
            var match = re.exec(str);
            if (match && match[2]) {
                callback(match[2]);
            }
        });
    });
}

new KateLibby();
