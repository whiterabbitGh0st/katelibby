var chrono = require('chrono-node');

module.exports = function(katelibby, target, from, args) {
  var parseResults = chrono.parse("in "+args),
      parseResult  = parseResults && parseResults[0] ? parseResults[0] : null;

  if (parseResult) {
    var when = parseResult.startDate,
        reminder = args.slice(parseResult.index + parseResult.text.length).trim();

    katelibby.addEvent(when, function() {
        katelibby.say(target, from + ': ' + reminder);
    });

    return "Alright, I will remind you at " + when.toString();
  } else {
    return "Not sure what you expected me to do with that..."
  }
};
