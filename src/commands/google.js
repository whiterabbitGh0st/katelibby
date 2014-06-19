var google = require('google');

module.exports = function kateGoogle(katelibby, target, from, args) {
    google.resultsPerPage = 25;

    google(args, function(err, next, links) {
        if (err) {
            console.error(err);
        }

        katelibby.say(target, links[0].title + ' - ' + links[0].link); //link.href is an alias for link.link
        katelibby.say(target, links[0].description);
    });

    return 'searching ...';
}
