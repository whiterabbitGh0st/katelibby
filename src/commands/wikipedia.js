//India
var request     = require('request');
//
module.exports = function kateWeather(katelibby, target, from, args) {
  var api_url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles='+args+'&prop=revisions&rvprop=content&callback=?';
  request( api_url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      if (typeof json.query.pages[0] === 'undefined') { katelibby.say(target, "Are you trying to make me crash?");}
      else {
        var pagereq = 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=info&pageids='+json.query[0].pageid+'&inprop=url';
        request( api_url, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var jaysun = JSON.parse(body);
            if( typeof jaysun.query.pages[0].fullurl === 'undefined') { katelibby.say(target, "Are you trying to make me crash?");}
            else{ katelibby.say(target, jaysun.query.pages[0].fullurl ); }
          }
        }
      }
    }
  });
  return 'searching ...';
}
