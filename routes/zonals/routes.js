var express = require('express');
var router = express.Router();
var cors = require('cors');

// Routes
var zonalsAdminRoutes = require('./admin/routes');

// Controllers


// CORS Config
var corsOptions = require('../config/cors')

// Routes

// -> /zonals/admin
router.use('/admin', cors(corsOptions), zonalsAdminRoutes);

// -> /ca
router.use('/', cors(corsOptions));

module.exports = router;
