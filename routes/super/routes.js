var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../controllers/api/super/admin_auth');
var adminControls = require('../../controllers/api/super/admin_controls');
var mainAdminControls = require('../../controllers/api/main/admin/admin_controls');

// Middlewares
var SuperAdminTokenMiddleware = require("../../middlewares/super/TokenMiddleware");

// Routes

// -> /super/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /super/
router.use('/', SuperAdminTokenMiddleware.verify);

router.get('/user/:page', mainAdminControls.userInfo);

router.get('/participant/:id', adminControls.getParticipant);
router.get('/participanttoken/:id', adminControls.getParticipantToken);
router.put('/participant/:id', adminControls.patchParticipantData);

module.exports = router;
