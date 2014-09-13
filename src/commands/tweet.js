var Twit = require('twit');
var config = require("../twitter.js");

module.exports = function katetweet(katelibby, target, from, args, callback) {
    var twit = new Twit(config);
    if(typeof args !== 'string') {
        return 'wut';
    } else if(args.length > 125) {
        return 'Tweet is too long: ' + args.length;
    } else {
        katelibby.say(target, "Tweeting . . . " + args);
        twit.post('statuses/update', { status:  target+ ":"+ args }, function(err, data, response) { console.log(data)});
        return 'Tweeted!';
    }
}
