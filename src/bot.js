
/*
 * bot.js
 *  Description: This is a Node.js IRC bot used for wh.iterabb.it
 *  Authors: Beau Bouchard (@Beaubouchard)
 *           Turner ()
 * */
    var commandChar = '.';
    var cmd = {};

        cmd['luck']=     function() { kateLuck(); };
        cmd['help']=     function() { kateHelp(); };

    var http = require('http');
    var url = require('url');
    var path = require('path');

    var irc            = require('irc');
    var currentChannel = "#general";
    var config =    {
            autoConnect: true,
            autoRejoin: true,
            certExpired: false,
            channelPrefixes: "&#",
            channels: ['#general'],
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
        });


        bot.addListener('error', function(message) {
                console.log('error: ', message);
        });

        bot.addListener('message', function (from, to, text, message)
        {
            if(text.charAt(0) == commandChar){
                if(text.indexOf(" ") >= 0)
                {
                    var firstWord = text.substr(text.indexOf("."), text.indexOf(" "));
                    runCmd(firstWord);
                }
                else
                {
                    var firstWord = text.substr(1, text.length);
                    runCmd(firstWord);
                }
            }else{
                //not a command, but check for http://
                //console.Log(isURL());
                if(isURL(text))
                {
                    getTitle(text);
                }
            }
        });

    function isURL(str)
    {
        var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
        var url = new RegExp(urlRegex, 'i');
        return str.length < 2083 && url.test(str);
    }

    function getTitle(incurl)
    {
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
                    bot.say(currentChannel,match[2]);
                }
            });
        });
    }
    function runCmd(incText)
    {
        console.log(incText);
         if (typeof cmd[incText] == 'function')
         {
             cmd[incText]();
         }
         else
         {
            bot.say(currentChannel,"I am sorry, I do not recognize that Command");
         }
    }
    function kateHelp()
    {
        var msg = "Hello, I am Kate Libby, a bot. My commands are: .help, .luck";
        bot.say(currentChannel,msg);
    }
    function kateLuck()
    {
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
        var msg = li[Math.floor(Math.random() * li.length)];
        bot.say(currentChannel,msg);
    }
    function readLink()
    {

    }
