var google = require('google');

module.exports = function kateGoogle(katelibby, target, from, args) {
    google.resultsPerPage = 25;

    google(args, function(err, next, links) {
        if (err) {
            console.error(err);
            return;
        }

        if (links && links.length) {
            katelibby.say(target, links[0].title + ' - ' + links[0].href);
            katelibby.say(target, links[0].description);
        } else {
            katelibby.say(target, 'Nothing found, try harder.');
        }
    });

    return 'searching ...';
}
