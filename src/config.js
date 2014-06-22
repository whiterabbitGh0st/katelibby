var config = {};

config.server = "localhost";
config.port = 6667;

config.userName = "kate";
config.realName = "Kate Libby"

config.debug = true;
config.showErrors = true;
config.channels = ['#general'];

config.commandChar = '!';

config.production: {
    //url to be used in link generation
    url: 'https://www.wh.iterabb.it/',
    //exturnal database connection
    MySQL: {
        use: false,  //set to true to use a MySQL database.
        host: '127.0.0.1',
        port: '27017',
        db:   'dbnamehere',
        user: 'readUsername',
        pass: ''//Kate will prompt for passwords, then save it to here. 
    },
    dbuser
    //server details
    server: {
        host:   '127.0.0.1',
        port:   '3421'
    }
}

module.exports = config;
