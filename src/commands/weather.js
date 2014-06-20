//Returns weather from underground weather, !w only allows 500 calls a day and 10 a minute
var request     = require('request');
var api_key = 'fabb62f145a3e4ef';
var api_url = 'http://api.wunderground.com/api/'+api_key+'/conditions/q/';
module.exports = function kateWeather(katelibby, target, from, args) {
        var url = api_url + args + '.json';
        request( url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var json = JSON.parse(body);
          if (typeof json.current_observation  === 'undefined') { katelibby.say(target, "Are you trying to make me crash?");}
          else { returnstring = "Current temperature in "+ json.current_observation.display_location.city
                    +", " + json.current_observation.display_location.state_name  +", " + json.current_observation.display_location.zip
                    +" is " +json.current_observation.temp_f+ "°F, with a humidity of "+json.current_observation.relative_humidity ;
                katelibby.say(target, returnstring );}
      }
    });
    return 'searching ...';
}
