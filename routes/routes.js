var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('./config/cors');
// Routes
var caRoutes = require('./ca/routes');
var bookRoutes = require('./book/routes');

// Controllers
var viewController = require('../controllers/view_controller');
if (process.env.REACT_APP_SERVER_ENVIORNMENT !== 'dev') {
    var verifyCerti = require('../controllers/api/Certificates/verifyCertificates');
}

// Routes

// -> /api
router.use('/api/ca', caRoutes);
router.use('/api/book', bookRoutes);
if (process.env.REACT_APP_SERVER_ENVIORNMENT !== 'dev') {
    router.use('/api/certiVerify', cors(corsOptions),  verifyCerti.certi_verify );
}
// -> /*
router.get('/*', viewController);

module.exports = router;