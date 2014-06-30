module.exports = function(katelibby, target, from, args) {
  var diff = args.split(" ");
  var when = new Date(new Date().getTime() + parseInt(diff[0])*60000);
  katelibby.addEvent(when, from+":"+args.substr(args.charAt(' '),args.length) , target,function(to,msg){ katelibby.say(to,msg); });
  return "Alright, I will remind you at " + when.toString();
};
