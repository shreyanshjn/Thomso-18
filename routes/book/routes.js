var express = require('express');
var router = express.Router();

var bookController = require('../../controllers/api/book/controller');

/* GET ALL BOOKS */
router.get('/', bookController.getBook);

/* SAVE BOOK */
router.post('/', bookController.addBook);

module.exports = router;