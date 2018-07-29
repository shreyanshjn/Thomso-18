'use strict';

var mysql = require('mysql');

require('dotenv').config();

var con = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME
});

// console.log(con);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connection established successfully.");
});

module.exports = con;