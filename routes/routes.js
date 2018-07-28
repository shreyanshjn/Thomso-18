var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('./config/cors');
// Routes
var caRoutes = require('./ca/routes');
var bookRoutes = require('./book/routes');

// Controllers
var viewController = require('../controllers/view_controller');
var verifyCerti = require('../controllers/Certificates/verifyCertificates');
// Routes

// -> /api
router.use('/api/ca', caRoutes);
router.use('/api/book', bookRoutes);
router.use('/api/certi_verify', cors(corsOptions), verifyCerti );
// -> /*
router.get('/*', viewController);

module.exports = router;