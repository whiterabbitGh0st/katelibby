
/*
 * bot.js
 *  Description: This is a Node.js IRC bot used for wh.iterabb.it
 *  Authors: Beau Bouchard (@Beaubouchard)
 *           Turner ()
 * */
    var commandChar = '.';
    var cmd = {};

        cmd['luck']=     function(){kateLuck();};
        cmd['help']=     function(){kateHelp();};
    

        var irc            = require('irc');
        var currentChannel = "#katetest";
        var config =    {
            autoConnect: true,
            autoRejoin: true,
            certExpired: false,
            channelPrefixes: "&#",
            channels: ['#katetest'],
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
    }


    function startListening()
    {
        bot.addListener('error', function(message) {
                console.log('error: ', message);
        });

        bot.addListener('message', function (from, to, text, message)
        {
            if(text.charAt(0) == commandChar){
                var firstWord = codeLine.substr(0, codeLine.indexOf(" "));
                cmd[firstWord]();
            }
        });
    }

    function kateHelp()
    {
        var msg = "Hello, I am Kate Libby, a bot. My commands are: .help, .luck";
        bot.say(currentChannel,msg);
    }

    function kateLuck()
    {
        var msg = "FCUK";
        bot.say(currentChannel,msg);
    }



    initBot();
    startListening();
