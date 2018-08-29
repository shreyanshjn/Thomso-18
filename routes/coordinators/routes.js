var express = require('express');
var router = express.Router();
var cors = require('cors');

// Controllers
var coordinatorRegister = require('../../controllers/api/coordinators/coordinators_register');

// Middlewares
var CoordinatorsTokenMiddleware = require("../../middlewares/coordinators/TokenMiddleware");

// CORS Config
var corsOptions = require('../config/cors')

// Routes
router.use('/', cors(corsOptions));

// -> /main/auth
router.post('/auth/register', coordinatorRegister.participant_registration);

module.exports = router;