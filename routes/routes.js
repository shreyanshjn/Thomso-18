var express = require('express');
var router = express.Router();
var cors = require('cors');

// Routes
var caAdminAuth = require('./ca/admin/auth');
var caAdminRoutes = require('./ca/admin/routes');
var caAuth = require('./ca/auth');
var caScore = require('./ca/score');
var caAuthRoutes = require('./ca/routes');
var book = require('./book');

// Middlewares
var CAAdminTokenMiddleware = require("../middlewares/ca/admin/TokenMiddleware");
var CAUserTokenMiddleware = require("../middlewares/ca/user/TokenMiddleware");

// Whitelist
var whitelist = ['https://thomso.in', 'https://www.thomso.in', 'www.thomso.in', 'thomso.in']
if (process.env.REACT_APP_SERVER_ENVIORNMENT === 'dev') {
  whitelist = ['http://localhost:'+process.env.PORT, 'http://localhost:'+process.env.REACT_APP_SERVER_PORT, 'http://localhost:80', undefined];
}

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.use('/api/ca/score', caScore);
router.use('/api/ca/admin/auth', cors(corsOptions), caAdminAuth);
router.use('/api/ca/admin', cors(corsOptions), CAAdminTokenMiddleware.verify, caAdminRoutes);
router.use('/api/ca/auth/fblogin', cors(corsOptions), caAuth.fblogin);
router.use('/api/ca/auth/fbRegister', cors(corsOptions), CAUserTokenMiddleware.verify, caAuth.fbRegister);
router.use('/api/ca', cors(corsOptions), CAUserTokenMiddleware.verify, caAuthRoutes);
router.use('/api/book', book);

module.exports = router;