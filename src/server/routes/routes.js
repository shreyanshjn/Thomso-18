var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
require('dotenv').config();
var con = require('../database/connection');

var isOrigin = require('../app/middlewares/isOrigin');


var whitelist = process.env.ENV == 'dev' ? ['http://localhost:4001', 'http://localhost:3000'] : ['https://www.iitr.ac.in/spark/', 'http://spark.iitr.ac.in/', 'spark.iitr.ac.in/'];
var corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}




//  loads a middleware function in it for all /prash/  urls
router.get('/', function (req, res) {
  res.send('go to /product')
})

router.get('/product', (req, res) => {
  var query = 'select * from test';
  con.query(query, (err, results, field) => {
    if(err){
      res.json({
        status: 400,
        is_success: false
      })
    }
    else{
      return res.json({
        status : 200,
        is_success: true,
        data : results
      })
    }
  });
})

router.get('/product/add', (req, res) => {
  const { name, password } = req.query;
  var query = `Insert into test (name, password) values ('${name}', '${password}')`;
  con.query(query, (err, results, field) => {
    if(err){
      res.send(err)
    }
    else{
      return res.json({
        status:200,
        is_success:true,
        data: results
      })
    }
  });
})

router.use('/prash',function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('', function (req, res) {
  res.send('Birds home page')
})

router.get('/prash/', function (req, res) {
  res.send('Birds home page')
})

router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router