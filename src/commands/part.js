module.exports = function(katelibby, target, from, args) {
    args.split(" ").map(function(channel) {
        katelibby.part(channel, "later bitches", function(){ console.log('leaving' + channel);});
    });
};
