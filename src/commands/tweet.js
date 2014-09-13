var Twit = require('twit');
var config = require("../twitter.js");

module.exports = function katetweet(katelibby, target, from, args, callback) {
    var twit = new Twit(config);
    if(typeof args !== 'string') {
    return 'tweet must be of type String';
  } else if(args.length > 140) {
    return 'tweet is too long: ' + args.length;
  }
  twit.post('statuses/update', { args }, callback);
  return 'searching ...';
}
