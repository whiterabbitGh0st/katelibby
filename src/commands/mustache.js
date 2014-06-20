 //http://mustachify.me/?src=
 var request     = require('request');
 var api_url = 'http://mustachify.me/?src=';
 module.exports = function kateWeather(katelibby, target, from, args) {
        var url = api_url + args;
        request( url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            katelibby.say(target, body );
        }
    });
    return 'Get your mustache wax ready';
}
