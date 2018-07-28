var mongoose = require("mongoose");
var passport = require("passport");
var request = require("request");
var settings = require("../../config/settings");
require("../../config/ca/fb_passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();

var CA_User = require("../../models/ca/CA_User");

var client_id = process.env.REACT_APP_FB_ID;
var client_secret = process.env.FACEBOOK_APP_SECRET;

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Login using Facebook
router.post('/fblogin', function(req, res) {
  var accessToken = req.body.accessToken;
  var data = {
    fb_id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    image: req.body.image
  }
  request(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${accessToken}`, function(err, response, body){
    var access_token = JSON.parse(response.body).access_token;
    var saveData = Object.assign(data, {access_token: access_token})
    CA_User.findOne({
      fb_id: req.body.id
    }, function(err, user) {
      if (err) {
        return res.status(400).send({
          success:false,
          msg: 'Unable to connect to database. Please try again.',
          error: err
        })
      }
      if (!user) {
        // Return Data
        var newUser = new CA_User(saveData);
        newUser.save(function(err, user) {
          if (err) {
            return res.json({success: false, msg: 'Unable to Add User'});
          }
          token = jwt.sign(user.toJSON(), settings.secret);
          res.json({success: true, msg: 'New User, Created False', token: 'JWT ' + token, new: true, body:user});
        });
      } else {
        // Update User
        if (user.created) {
          CA_User.findOneAndUpdate({fb_id: req.body.id}, saveData, { new:true }, function(err, user) {
            if(err){
              return res.status(400).send({success:false, msg:'Error Updating User', error:err});
            }
            console.log(user, 'findOneAndUpdate');
            token = jwt.sign(user.toJSON(), settings.secret);
            return res.json({success:true, msg:'User Successfully Updated', token: 'JWT ' + token, body:user});
          })
        } else {
          token = jwt.sign(user.toJSON(), settings.secret);
          res.json({success: true, msg: 'New User, Creating...', token: 'JWT ' + token, new: true, body:user});
        }
      }
    });
  });
});

// Register Using Facebook
router.post('/fbRegister', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      CA_User.findOne(
        {
          fb_id: req.user.fb_id
        },
        function(err, user) {
          if (err) {
            return res.status(400).send({
              success: false,
              msg: "Unable to connect to database. Please try again.",
              error: err
            });
          }
          if (!user) {
            return res
              .status(400)
              .send({ success: false, msg: "User Not Found" });
          } else {
            var data = {
              name: req.body.name,
              contact: req.body.contact,
              email: req.body.email,
              gender: req.body.gender,
              college: req.body.college,
              state: req.body.state,
              branch: req.body.branch,
              address: req.body.address,
              why: req.body.why,
              created: true
            };
            CA_User.findOneAndUpdate(
              { fb_id: req.user.fb_id },
              data,
              { new: true },
              function(err, user) {
                if (err) {
                  return res.status(400).send({
                    success: false,
                    msg: "Error Creating User",
                    error: err
                  });
                }
                token = jwt.sign(user.toJSON(), settings.secret);
                return res.json({
                  success: true,
                  msg: "User Created",
                  token: "JWT " + token,
                  body: user
                });
              }
            );
          }
        }
      );
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

module.exports = router;
