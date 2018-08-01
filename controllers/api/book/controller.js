var Book = require('../../../models/Book');

/* GET ALL BOOKS */
exports.getBook = function(req, res) {
  Book.find(function (err, books) {
    if (err) return next(err);
    res.json(books);
  });
};

/* SAVE BOOK */
exports.addBook = function(req, res) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};
