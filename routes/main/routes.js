var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = require('../config/cors')
var participantRegister = require('../../controllers/api/main/participant_register');
var participantControl  = require('../../controllers/api/main/participant_controls');
var eventControl  = require('../../controllers/api/main/event_controls');

var MainUserTokenMiddleware = require("../../middlewares/main/user/TokenMiddleware");

router.use('/', cors(corsOptions));


// /main/auth
router.post('/auth/register', participantRegister.participant_registration);
router.post('/auth/verify', MainUserTokenMiddleware.verifyUser, participantRegister.verifyOTP);
router.post('/auth/login' , participantRegister.participant_login);

// main/resetPassword
router.post('/auth/resetEmail' , participantRegister.reset_password_email);
router.post('/auth/resetPassword' , participantRegister.reset_password);


// /main/
router.get('/user', MainUserTokenMiddleware.verifyUser , participantControl.userInfo);
router.get('/primary', eventControl.getEvents);
router.get('/events' , MainUserTokenMiddleware.verify, participantControl.getUserEvents);

// /main/event  --->  move to main admin
router.post('/addEvent' , eventControl.addEvent);
router.delete('/removeEvent' , MainUserTokenMiddleware.verify,eventControl.removeEvent);
router.get('/fetchEvent' , eventControl.fetchEvent);


// /main/event
router.post('/addParticipant' , MainUserTokenMiddleware.verify, eventControl.addParticipant);
router.post('/removeParticipant', MainUserTokenMiddleware.verify , eventControl.removeParticipant);


module.exports = router;