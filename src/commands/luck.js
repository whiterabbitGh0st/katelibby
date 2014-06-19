module.exports = function(katelibby, target, from, args) {
    li = [
        'Reply hazy, try again',
        'Excellent Luck',
        'Bad Luck',
        'Average Luck',
        'Good Luck',
        'Godly Luck',
        'Very Bad Luck',
        'Outlook Good',
        'Better not tell you now',
        'You will meet a dark handsome stranger',
        'ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!',
        '（　´_ゝ`）ﾌｰﾝ',
        'Good news will come to you by mail'
    ];
    return li[Math.floor(Math.random() * li.length)];
}
