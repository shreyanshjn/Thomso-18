var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
require('dotenv').config();
var con = require('../database/connection');

var isOrigin = require('../app/middlewares/isOrigin');
var addSponsor = require('../app/controllers/AddSponsor'); 


var whitelist = process.env.ENV == 'dev' ? ['http://localhost:4001', 'http://localhost:3000', 'http://localhost:3002'] : ['https://www.thomso.in', 'http://thomso.in/', 'thomso.in/'];
var corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.post('/api/addSponsor', [isOrigin.isOrigin, cors(corsOptions)], addSponsor.add_sponsor );

module.exports = router