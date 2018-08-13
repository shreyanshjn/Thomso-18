var express = require('express');
var router = express.Router();
var cors = require('cors');


// Controllers
var notifControl = require('../../controllers/api/notifications/notification_controls');

// CORS Config
var corsOptions = require('../config/cors');

// Routes

// -> /notification/
router.post('/', cors(corsOptions), notifControl.addTopic);

module.exports = router;
