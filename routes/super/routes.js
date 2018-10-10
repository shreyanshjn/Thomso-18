var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../controllers/api/super/admin_auth');
var adminControls = require('../../controllers/api/super/admin_controls');

// Middlewares
var SuperAdminTokenMiddleware = require("../../middlewares/super/TokenMiddleware");

// Routes

// -> /super/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /super/
router.use('/', SuperAdminTokenMiddleware.verify);

// router.get('/participants', adminControls.getParticipant);

module.exports = router;
