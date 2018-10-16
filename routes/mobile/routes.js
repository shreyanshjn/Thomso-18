var express = require('express');
var router = express.Router();

// Controls
var mobileControls = require('../../controllers/api/mobile/controls');


// Routes

// -> /mobile/register/
router.post('/register/media', mobileControls.scanMediaQR);
router.post('/register/participant', mobileControls.scanParticipantQR);
router.get('/register/participant/:id', mobileControls.getParticipant);
router.get('/pronite', mobileControls.getPronite);

module.exports = router;
