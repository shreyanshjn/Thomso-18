var express = require('express');
var router = express.Router();
var cors = require('cors');

// Routes
var munAdminRoutes = require('./admin/routes');

// CORS Config
var corsOptions = require('../config/cors');

// Controls
var munControls = require('../../controllers/api/mun/controls');


// Routes

// -> /mun/admin
router.use('/admin', cors(corsOptions), munAdminRoutes);
router.post('/toppr', cors(corsOptions), munControls.addStudent);

module.exports = router;
