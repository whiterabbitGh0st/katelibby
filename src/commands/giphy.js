var querystring = require('querystring');
var request		= require('request');

var api_key = 'dc6zaTOxFJmzC';
var api_url = 'http://api.giphy.com/v1/gifs/search?';

module.exports = function(katelibby, target, from, args) {
	var url = api_url + querystring.stringify({
		q: args,
		api_key: api_key,
		limit: 1,
		offset: 0
	});

	request({url: url, json: true}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			if (typeof body.data[0] === 'undefined') { katelibby.say(target, "Are you trying to make me crash?");}
			else { katelibby.say(target, body.data[0].images.original.url);}
		}
	});
};
