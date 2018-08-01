// Whitelist
var whitelist = ['https://thomso.in', 'https://www.thomso.in', 'www.thomso.in', 'thomso.in'];

if (process.env.REACT_APP_SERVER_ENVIORNMENT === 'dev') {
  whitelist = ['http://localhost:'+process.env.PORT, 'http://localhost:'+process.env.REACT_APP_SERVER_PORT, 'http://localhost:80', undefined];
}

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

module.exports = corsOptions;
