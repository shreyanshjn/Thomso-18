var express = require('express');
var router = express.Router();
var cors = require('cors');

// Routes
var munAdminRoutes = require('./admin/routes');

// CORS Config
var corsOptions = require('../config/cors');

// Routes

// -> /mun/admin
router.use('/admin', cors(corsOptions), munAdminRoutes);

module.exports = router;
