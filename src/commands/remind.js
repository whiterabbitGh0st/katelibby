module.exports = function(katelibby, target, from, args) {
  var diff = args.split(" ");
  var when = new Date(new Date().getTime() + parseInt(diff[0])*60000);
  diff.splice(0,1);
  katelibby.addEvent(when, from+": "+ diff.join(" "), target,function(to,msg){ katelibby.say(to,msg); });
  return "Alright, I will remind you at " + when.toString();
};
