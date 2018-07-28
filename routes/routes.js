var express = require('express');
var router = express.Router();

// Routes
var caRoutes = require('./ca/routes');
var bookRoutes = require('./book/routes');

// Controllers
var viewController = require('../controllers/view_controller');

// Routes

// -> /api
router.use('/api/ca', caRoutes);
router.use('/api/book', bookRoutes);

// -> /*
router.get('/*', viewController);

module.exports = router;