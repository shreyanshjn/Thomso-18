var express = require('express');
var router = express.Router();

var Book = require('../models/Book');

/* GET ALL BOOKS */
router.get('/', function(req, res) {
  Book.find(function (err, books) {
    if (err) return next(err);
    res.json(books);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;