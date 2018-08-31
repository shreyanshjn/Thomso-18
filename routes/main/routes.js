var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('../config/cors')
var participantRegister = require('../../controllers/api/main/participant_register');
var participantControl  = require('../../controllers/api/main/participant_controls');
var MainUserTokenMiddleware = require("../../middlewares/main/user/TokenMiddleware");

router.use('/', cors(corsOptions));


// /main/auth
router.post('/auth/register', participantRegister.participant_registration);
router.post('/auth/verify', MainUserTokenMiddleware.verifyUser, participantRegister.verifyOTP);
router.post('/auth/login' , participantRegister.participant_login);


// /main/control
router.get('/user', MainUserTokenMiddleware.verifyUser , participantControl.userInfo);
module.exports = router;