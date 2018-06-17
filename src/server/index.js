const express = require('express');
var path = require('path');
var https = require('https');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();
var routes = require('./routes/routes');
var app = express();
require('dotenv').config();

// express mysql session
// var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);

// var options = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// };
 
// var sessionStore = new MySQLStore(options);
 
// app.use(session({
//     key: process.env.COOKIE_NAME,
//     secret: process.env.COOKIE_SECRET,
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {path: '/', httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000}
// }));

// view engine setup
app.use(express.static('public'))
app.use(express.static(__dirname +'./../../')); //serves the index.html
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes)

// const crypto = require('crypto'),
//   fs = require("fs"),
//   http = require("http");
// const options = {
//   cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
//   key: fs.readFileSync(path.resolve(__dirname, 'key.pem'))
// }

// // var privateKey = fs.readFileSync('key.pem').toString();
// // var certificate = fs.readFileSync('cert.pem').toString();

// var credentials = crypto.createCredentials({key: options.key, cert: options.cert});

// var certificate =fs.readFileSync('cert.pem',{encoding:'utf8'},function(err, data ) {
//   console.log( data );});
// var privateKey  = fs.readFileSync('key.pem',{encoding:'utf8'},function(err, data ) {
//   console.log( data );});

  // var credentials = {
  //   key: options.key,
  //   cert: options.cert,
  //   rejectUnauthorized:false
  // };
  
  // // UNCOMMENT THIS LINE AFTER INSTALLING CA CERTIFICATE
  // //  credentials.ca = fs.readFileSync('cert.pem', 'utf8');;
  
  // var httpServer = http.createServer(app);
  // var httpsServer = https.createServer(credentials, app);
  
  //   // httpServer.listen(3001, function() {
  //   //   console.log('HTTP server listening on port ' );
  //   //  })  ;
  
  // httpsServer.listen(3001, function() {
  //   console.log('HTTPS server listening on port ');
  // });

// var handler = function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// };

// var server = http.createServer();
// server.setSecure(credentials);

// // catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Invalid Route')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  const message = err.message
  console.log(err)
  res.status(err.status || 500).json({ message })
})
app.listen(process.env.PORT, ()=>{
	console.log('app is running');
});

module.exports = app;