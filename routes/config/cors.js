var corsOptions = {
  origin: function(req, origin, callback) {

    var corsWhitelist = ['https://thomso.in', 'https://www.thomso.in', 'www.thomso.in', 'thomso.in'];

	if (process.env.REACT_APP_SERVER_ENVIORNMENT === 'dev') {
	  corsWhitelist = ['http://localhost:'+process.env.PORT, 'https://localhost:'+process.env.PORT, 'http://localhost:'+process.env.REACT_APP_SERVER_PORT, 'https://localhost:'+process.env.REACT_APP_SERVER_PORT, 'http://localhost:80'];
	}
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (origin === undefined && ALLOWED_HOSTS.indexOf(req.header.host)) {
      callback(null, true);
    } else {
      // callback(null, true)
      callback(new Error(' not allowed by CORS'));
    }
  },
  credentials: true,
}

module.exports = corsOptions;