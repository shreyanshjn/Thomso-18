var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../../controllers/api/ca/admin/admin_auth');
var adminControls = require('../../../controllers/api/ca/admin/admin_controls');

// Middlewares
var CAAdminTokenMiddleware = require("../../../middlewares/ca/admin/TokenMiddleware");

// Routes

// -> /ca/admin/auth
// router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /ca/admin
router.use('/', CAAdminTokenMiddleware.verify);

router.get('/participants', adminControls.getParticipant);
router.get('/score', adminControls.getScoreList);
router.get('/exportToCSV', adminControls.exportToCSV);

router.get('/ideas', adminControls.getIdeas);
router.put('/idea/:id', adminControls.putIdea);
router.delete('/idea/:id', adminControls.deleteIdea);

router.put('/block/:id', adminControls.blockUser);

router.put('/bonus', adminControls.putBonus);

module.exports = router;
