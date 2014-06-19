module.exports = function(katelibby, target, from, args) {
	var msg      = "Hello, I am " + katelibby.config.realName + ", a bot. My commands are: ";
	var commands = Object.keys(katelibby.commands).map(function(command) { return '!' + command; }).join(' ');

	katelibby.say(target, msg + commands);
}
