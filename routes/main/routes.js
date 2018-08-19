var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('../config/cors')
var participantRegister = require('../../controllers/api/main/participant_register');
router.use('/', cors(corsOptions));


// /main/auth
router.post('/auth/register', participantRegister.participant_registration);
router.post('/auth/verify', participantRegister.verifyOTP);
router.post('/auth/login', participantRegister.participant_login);

module.exports = router;