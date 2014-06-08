/*
 * bot.js
 *
 *
 * */
function KATE () {
    this.bot;
    this.config =
    {
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
    this.irc            = require('irc');
}
KATE.prototype = {
    initialize: function()
    {
        this.initBot();
        this.startListener();
    },
    initBot: function()
    {
        this.bot = new this.irc.Client(
            this.config.server,
            this.config.userName,
            {
                realname:   this.config.realName,
                channels:   this.config.channels,
                username:   this.config.userName
            });
    },
    startListener: function()
    {
        this.bot.addListener('message', function (from, to, text, message)
            {
                //command prefix is going to be .
                if(text.charAt(0) == ".")
                {
                        var commandreg = (?:^|(?:\.\s))(\w+);
                        var commandStack = message.match(commandreg);
                        //foreach commandstack
                        //  process command
                }
            });
       // this.bot.addListener();
    },
    processCommand: function(incCommand)
    {
        switch(inCommand)
        {
            case '.help':
                this.bot.say("");
        }
    }




}

katebot = new KATE();
katebot.initialize();
