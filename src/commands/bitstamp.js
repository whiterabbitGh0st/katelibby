var request = require('request');
var moment  = require('moment');
var api_url = 'http://www.cryptocoincharts.info/v2/api/tradingPair/'

module.exports = function(katelibby, target, from, args) {
    var pair = args.split(' ').filter(String).concat(['btc', 'usd']).slice(0, 2),
         url = api_url + pair.join('_');

    request({url: url, json: true}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var last_trade = moment(body.latest_trade + ' +0000', 'YYYY-MM-DD HH:mm Z').local(),
                result = '1 ' + pair[0].toUpperCase() + ' = ' + body.price + ' ' + pair[1].toUpperCase() + ' (last trade: ' + last_trade.fromNow() + ')';

            katelibby.say(target, result);
        }
    });
};
