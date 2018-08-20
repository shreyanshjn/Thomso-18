var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('./config/cors');
// Routes
var caRoutes = require('./ca/routes');
var betaRoutes = require('./beta/routes');
var notificationRoutes = require('./notification/routes');
var zonalsRoutes = require('./zonals/routes');

// Controllers
var viewController = require('../controllers/view_controller');
var verifyCerti = require('../controllers/api/Certificates/verifyCertificates');

// Routes

// -> /api
router.use('/api/ca', caRoutes);
router.use('/api/beta', betaRoutes);
router.use('/api/notification', notificationRoutes);
router.use('/api/certiVerify', cors(corsOptions),  verifyCerti.certi_verify );
router.use('/api/zonals', zonalsRoutes);
// -> /*
router.get('/*', viewController);

module.exports = router;
