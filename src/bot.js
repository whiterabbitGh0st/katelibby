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
var commands    = require('./commands/');
var config      = require('./config');
var urlRegex    = require('./url-regex');
var pkginfo     = require('../package.json');

var commandChar = config.commandChar;
var commandPattern = new RegExp('^' + commandChar + '(\\w+) ?(.*)');

var KateLibby = function() {
    this.config = config;
    this.eventStack = [];
    setupCommands.call(this);
    setupIRCBot.call(this);
    setupMessageHandler.call(this);
    this.pc = 0;
    this.wordlist=[];

}

KateLibby.prototype.getPC = function() {
    return this.pc;
}

KateLibby.prototype.incPC = function(numb) {
    this.pc += numb;
}

KateLibby.prototype.addWord = function(newWord) {
    this.wordlist.push(newWord);
}

KateLibby.prototype.say = function(to, message) {
   var coloredstring = irc.colors.wrap("magenta", message);
    this.client.say(to, coloredstring);
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
        var url, subreddit;
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
        } else if (subreddit = isSUB(text)) {
                //katelibby.say(target, );
            getSub(subreddit, function(sub) {
                katelibby.say(target,  sub );
            });
        } else if (hotword = checkSpec(text)) {
            getSpec( hotword , katelibby, function(response) {
                katelibby.say(target, response);
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

function isSUB(str) {
    var match;
    if (str.length < 2083 && (match = str.match(/\/r\/([^\s\/]+)/i))) {
        return match[0];
    }

    return false;
}

function getSub(sub, callback) {
    callback( "Are you talking about http://www.reddit.com" + sub + "/ ?");
}

function checkSpec(str) {
    if (match = str.match(/redhead/i)) {
        return match[0];
    } else if (match = str.match(/drunk/i)) {
        return match[0];
    } else if (match = str.match(/bruce jenner/gi)){
        return match[0];
    } else if (match = str.match(/hungry/i)){
        return match[0];
    } else if (match = str.match(/honestly/gi)){
        return match.length;
    } else if (match = str.match(/tbh/i)){
        return match.length; 
    }

    return false;
}

function getSpec(potato,ikl, callback) {
    var kl = ikl;
    var keyWord = potato.toUpperCase();
    if(keyWord==="redhead"){ callback("Did some one say redheads?"); }
    else if(typeof keyWord == "number"){ kl.incPC(keyWord); callback("Honesty Count:"+kl.getPC());}
    else if(keyWord === "hungry"){callback("Food!");}
    else if(keyWord === "bruce jenner"){ callback("her name is caitlyn jenner");}
    else if(keyWord === "drunk"){ callback("ツ"); }
    else if(keyWord === "tbh") { kl.incPC(keyWord); callback("Honesty Count:"+kl.getPC());}
    else {
        //do nothing
    }
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

console.log('katelibby ' + pkginfo.version)
new KateLibby();
