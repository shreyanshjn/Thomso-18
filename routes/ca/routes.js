var express = require('express');
var request = require('request');

var router = express.Router();

var passport = require('passport');
require('../../config/ca/fb_passport')(passport)

var Users = require('../../models/ca/CA_User');

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

/* GET ALL Users */
router.get('/posts', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Users.findOne({
        fb_id: req.user.fb_id
    }, function (err, user) {
      if (err) return next(err);
      var fb_auth_token = user.access_token;
      request(`https://graph.facebook.com/v3.0/me?fields=posts.limit(100){created_time,id,full_picture,message,link}&access_token=${fb_auth_token}`, function(err, response, body){
        if (err) return next(err);
        if (response.statusCode) {
            return res.status(response.statusCode).send(body);
        }
        return res.status(400).send({success: false, msg: 'Facebook didnt return status.'});
      })
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;