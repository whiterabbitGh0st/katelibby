// https://api.woot.com/1/sales/current.json/www.woot.com
var request     = require('request');
var api_url = 'https://api.woot.com/1/sales/current.json/www.woot.com';
module.exports = function kateWeather(katelibby, target, from, args) {
        request( api_url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                if (typeof json.sales[0]  === 'undefined') { katelibby.say(target, "Are you trying to make me crash?");}
                else {  katelibby.say(target, json.sales[0].Title + ' for  ' + json.sales[0].Price );
                        katelibby.say(target, json.sales[0].SaleUrl ); }
        }
    });
    return 'Getting latest woot sale ...';
}
