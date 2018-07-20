var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose');

var caAuth = require('./routes/ca/auth');
var caAdminAuth = require('./routes/ca/admin/auth');
var caAdminRoutes = require('./routes/ca/admin/routes');
var book = require('./routes/book');
var app = express();

mongoose.Promise = require('bluebird');
var dbHost = process.env.DB_HOST || 'localhost';
var dbName = process.env.DB_NAME;
var dbUser = process.env.DB_USERNAME;
var dbPass = process.env.DB_PASSWORD;
var dbPort = process.env.DB_PORT || '27017';
mongoose.connect('mongodb://'+dbUser+':'+dbPass+'@'+dbHost+':'+dbPort+'/'+dbName, { promiseLibrary: require('bluebird'), useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/static/*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

// app.get('/static/*.css', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });

app.use('/api/ca/auth', caAuth);
app.use('/api/ca/admin/auth', caAdminAuth);
app.use('/api/ca/admin', caAdminRoutes);
app.use('/api/book', book);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;