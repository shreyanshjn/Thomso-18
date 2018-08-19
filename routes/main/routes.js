var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('../config/cors')
var participantRegister = require('../../controllers/api/main/participant_register');
router.use('/', cors(corsOptions));


// /main/registrations
router.post('/auth/register', participantRegister.participant_registration);
router.post('/auth/verify', participantRegister.participant_registration);
router.post('/auth/login', participantRegister.participant_registration);

module.exports = router;
