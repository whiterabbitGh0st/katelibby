/*
 * bot.js
 *  Description: This is a Node.js IRC bot used for wh.iterabb.it
 *  Authors: Beau Bouchard (@Beaubouchard)
 *           Turner ()
 *           Eric Norris (@ericnorris)
 *
 */

var irc         = require('irc');
var schedule    = require('node-schedule');
var request     = require('request');
var entities    = require('entities');
var config      = require('./config');
var commands    = require('./commands/');
var urlRegex    = require('./url-regex');

var commandChar = config.commandChar;
var commandPattern = new RegExp('^' + commandChar + '(\\w+) ?(.*)');

var KateLibby = function() {
    this.config = config;
    this.eventStack = [];
    setupCommands.call(this);
    setupIRCBot.call(this);
    setupMessageHandler.call(this);
}

KateLibby.prototype.say = function(to, message) {
    this.client.say(to, message);
}

KateLibby.prototype.join = function(channel, callback) {
    this.client.join(channel, callback);
}

KateLibby.prototype.part = function(channel, msg, callback) {
    this.client.part(channel, msg, callback);
}

KateLibby.prototype.addEvent = function(date, callback, data) {
    var nEvent = schedule.scheduleJob(date, function (){ callback(data); });
    this.eventStack += nEvent;
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
        var url;
        if (match) {
            command = match[1];
            args = match[2];

            if (command in katelibby.commands) {
                var result = katelibby.commands[command](katelibby, target, from, args);
                if (result !== undefined) {
                    katelibby.say(target, result.toString());
                }
            }
        } else if (url = isURL(text)) {
            getTitle(url, function(title) {
                katelibby.say(target, '[' + title + ']');
            });
        }
    });
}

// --- Util ---
function isURL(str) {
    var match;
    if (str.length < 2083 && (match = str.match(urlRegex))) {
        return match[0];
    }

    return false;
}

function getTitle(url, callback) {
    var url = (url.indexOf('http') !== 0 ? 'http://' + url : url);
    var titleRegex = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/ig;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var match = titleRegex.exec(body);
            if (match && match[2]) {
                var decodedTitle = entities.decodeHTML(match[2]);
                callback(decodedTitle);
            }
        }
    });
}

new KateLibby();
