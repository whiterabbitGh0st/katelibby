module.exports = function(katelibby, target, from, args) {
    args.split(" ").map(function(channel) {
        katelibby.part(channel, function() {
            katelibby.say(channel, from + ': "leaving ' + channel + '"');
        });
    });
};
