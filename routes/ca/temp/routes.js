var express = require('express');
var router = express.Router();

// Controllers
var tempAuth = require('../../../controllers/api/ca/ca_temp_register');

// var adminControls = require('../../../controllers/api/ca/admin/admin_controls');

// Middlewares
var TempCATokenMiddleware = require("../../../middlewares/ca/temp_user/TokenMiddleware");

// Routes

// -> /ca/temp/auth
router.post('/auth/register', tempAuth.ca_temp_register);
router.post('/auth/login', tempAuth.ca_temp_login);
router.post('/auth/verify', tempAuth.verify);
router.post('/auth/reset', TempCATokenMiddleware.verifyTemp, tempAuth.reset);

module.exports = router;