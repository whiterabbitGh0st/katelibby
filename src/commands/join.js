module.exports = function(katelibby, target, from, args) {
	args.split(" ").map(function(channel) {
		katelibby.join(channel, function() {
			katelibby.say(channel, from + ': "join ' + channel + '"');
		});
	});
};
