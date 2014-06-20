var request     = require('request');
var api_url     = 'https://xkcd.com/%d/';

module.exports = function kateWeather(katelibby, target, from, args) {
        var url = 'https://xkcd.com/info.0.json';
        request( url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                if (typeof json.num  === 'undefined') { katelibby.say(target, "Are you trying to make me crash?");}
                else {  katelibby.say(target, api_url+ Math.floor((Math.random() * json.num) + 1) ); }
        }
    });
    return 'Getting random xkcd comic ...';
}
