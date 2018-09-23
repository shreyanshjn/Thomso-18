var express = require('express');
var router = express.Router();
var cors = require('cors');

// Controllers
var controlsRegister = require('../../controllers/api/controls/controls_register');

// Middlewares
var ControlsTokenMiddleware = require("../../middlewares/coordinators/TokenMiddleware");

// CORS Config
var corsOptions = require('../config/cors')

// Routes
router.use('/', cors(corsOptions));

// -> /api/controls/auth
router.post('/auth/register', controlsRegister.register);

module.exports = router;