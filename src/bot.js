/*
 * bot.js
 *  Description: This is a Node.js IRC bot used for wh.iterabb.it
 *  Authors: Beau Bouchard (@Beaubouchard)
 *           Turner ()
 *           Eric Norris (@ericnorris)
 *
 */

 var commandChar = '!';
 var cmd = {};
 var queryswap = "";

cmd['luck']=     function(x) { return kateLuck(); };
cmd['help']=     function(x) { return kateHelp(); };
cmd['8ball']=    function(x) { return kate8Ball();};
cmd['fort']=     function(x) { return kateFortune();};
cmd['g']=        function(incargs) { return kateGoogle(incargs); };

var http = require('http');
var url = require('url');
var path = require('path');
var google = require('google');
var irc            = require('irc');
var currentChannel = "#general";
var config = {
    autoConnect: true,
    autoRejoin: true,
    certExpired: false,
    channelPrefixes: "&#",
    channels: [currentChannel,'#testkate'],
    debug: false,
    floodProtection: false,
    floodProtectionDelay: 1000,
    messageSplit: 512,
    port: 6667,
    realName: 'Kate Libby',
    sasl: false,
    secure: false,
    selfSigned: false,
    server: "localhost",
    showErrors: false,
    stripColors: false,
    userName: 'kate'
};
var bot = new irc.Client(
    config.server,
    config.userName,
    {
        realname:   config.realName,
        channels:   config.channels,
        username:   config.userName
    }
);


bot.addListener('error', function(message) {
    console.log('error: ', message);
});

bot.addListener('message', function (from, to, text, message) {
    if(text.charAt(0) == commandChar) {
        //commands
        if(text.indexOf(" ") >= 0) {
            //command with arguements
            var cmdWord = text.substr(1, text.indexOf(" ")-1);
            var commandArg =  text.substr(text.indexOf(" "),text.length);
            queryswap = commandArg;
            runCmd(cmdWord,from,commandArg);
        } else {
            //commands like .help, .luck have no arguements
            var cmdWord =  text.substr(1,text.length);
            runCmd(cmdWord,from);
        }
    } else {
        // not a command
        // checks to see if its a URL, if it is, prints title
        if(isURL(text)) {
            getTitle(text);
        }
    }
});

function isURL(str) {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
}

function getTitle(incurl) {
    var ahost = url.parse(incurl).hostname;
    var apath = url.parse(incurl).pathname;
    console.log(ahost);
    console.log(apath);
    var urlOpts = {host: ahost, path: apath, port: '80'};
    var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/ig;
    http.get(urlOpts, function (response) {
        response.on('data', function (chunk) {
            var str=chunk.toString();
            var match = re.exec(str);
            if (match && match[2]) {
                bot.say(currentChannel,"[ " + match[2] + " ]");
            }
        });
    });
}


function runCmd(incCmd, incFrom, incArg) {
    var response = "";
    console.log(incCmd);
    if (typeof cmd[incCmd] == 'function') {
        response = cmd[incCmd](incArg);
    } else {
        response = "I am sorry, I do not recognize that command";
    }

    bot.say(currentChannel, response);
}

function runCmd(incCmd, incFrom) {
    var response = "";
    console.log(incCmd);
    if (typeof cmd[incCmd] == 'function') {
        response = cmd[incCmd]();
    } else {
        response = "I am sorry, I do not recognize that command";
    }

    bot.say(currentChannel, response);
}

function kateHelp() {
    var msg = "Hello, I am Kate Libby, a bot. My commands are: ";
    for (var key in cmd) { msg = msg + commandChar + key + " "; }
        bot.say(currentChannel,msg);
}

function kateLuck() {
    li = [
        'Reply hazy, try again',
        'Excellent Luck',
        'Bad Luck',
        'Average Luck',
        'Good Luck',
        'Godly Luck',
        'Very Bad Luck',
        'Outlook Good',
        'Better not tell you now',
        'You will meet a dark handsome stranger',
        'ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!',
        '（　´_ゝ`）ﾌｰﾝ',
        'Good news will come to you by mail'
    ];
    return li[Math.floor(Math.random() * li.length)];
}

function kate8Ball() {
    li = [
        '45 seconds full throttle',
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes--definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Signs point to yes',
        'Yes',
        'Your request is not bro enough',
        'Reply hazy, try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        'I am sorry, too high to respond',
        'I think we both know the answer to that',
        'Hah!',
        'Don\'t count on it',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful'
    ];
    return li[Math.floor(Math.random() * li.length)];
}

function kateFortune() {
    li = [
        'You will make a fortune with your friend.',
        'Consolidate rather than expand your business in the near future.',
        'Everything will now come your way.',
        'You have at your command the wisdom of the ages.',
        'You have a deep appreciation of the arts and music.',
        'The great joy in life is doing what people say you cannot do.',
        'Invest in Bitcoins, I see great profits in your future.',
        'I see Anal sex in your future',
        'When you squeeze and orange, orange juice comes out - because that is whats inside',
        'Every exit is an entrance to new experiences',
        'ask your mom',
        'Today is the tomorrow we worried about yesterday',
        'There are no limitations to the mind except those we aknowledge.',
        'Old dreams never die they just get filed away.',
        'If you want the rainbow, you have to tolerate the rain.',
        'Man is born to live and not prepare to live',
        'To courageously shoulder the responsibility of ones mistake is character.',
        'Dont blow out other peoples candles, it wont make yours brighter.',
        'in hindsight, Oh well, is better than what if.',
        'measure twice, cut once',
        'keep cool, never freeze -mayonnaise jar',
        'always underpromise and overdeliver',
        'Never half-ass 2 things. Whole ass 1 thing.',
        'I am sorry, too high to respond',
        "Krishna be praised, can't a girl get a little peace and quiet",
        'Courtesy is contagious',
        'Sometimes when you get denied at the front door, the back door is unlocked',
        'Constant grinding can turn an iron rod into a needle.',
        'Anal Joke',
        'Too many people volunteer to carry the stool when its time to move the piano',
        'You will always get what you want through your charm and personality.',
        'Luck sometimes visits a fool, but it never sits down with him.',
        'Determination is the wake-up call to the human will.',
        'You are given the chance to take part in an exciting adventure.',
        'A fool is one who values advice spoken from stars and chance.',
        'Birds are entangled by their feet and men by their tongues.',
        'Starting down the right path is pointless, if you are just going to take a wrong turn at the first fork.',
        'The possibility of a career change is near.',
        '404 fortune not found'
    ];
    return li[Math.floor(Math.random() * li.length)];
}

function kateGoogle(incArgs) {
    //var fixed = incArgs.replace(" ", "+");
    google.resultsPerPage = 25;
    var nextCounter = 0;
    google(queryswap, function(err, next, links) {
        if (err) {
            console.error(err);
        }

        bot.say(currentChannel, links[0].title + ' - ' + links[0].link); //link.href is an alias for link.link
        bot.say(currentChannel, links[0].description);
    });

    return 'searching ...';
}
