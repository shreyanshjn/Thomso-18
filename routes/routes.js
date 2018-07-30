var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('./config/cors');
// Routes
var caRoutes = require('./ca/routes');
var bookRoutes = require('./book/routes');

// Controllers
var viewController = require('../controllers/view_controller');
<<<<<<< HEAD
if (process.env.REACT_APP_SERVER_ENVIORNMENT !== 'dev') {
    var verifyCerti = require('../controllers/api/Certificates/verifyCertificates');
}

=======
var verifyCerti = require('../controllers/api/Certificates/verifyCertificates');
>>>>>>> f29027c0a2e00376c12e367c2b0f529af5ee95d3
// Routes

// -> /api
router.use('/api/ca', caRoutes);
router.use('/api/book', bookRoutes);
<<<<<<< HEAD
if (process.env.REACT_APP_SERVER_ENVIORNMENT !== 'dev') {
    router.use('/api/certiVerify', cors(corsOptions),  verifyCerti.certi_verify );
}
=======
router.use('/api/certiVerify', cors(corsOptions),  verifyCerti.certi_verify );
>>>>>>> f29027c0a2e00376c12e367c2b0f529af5ee95d3
// -> /*
router.get('/*', viewController);

module.exports = router;