var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../../../config/ca/admin_passport')(passport)

var Users = require('../../../models/ca/CA_User');

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
router.get('/participants', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Users.find(function (err, allUsers) {
      if (err) return next(err);
      res.json(allUsers);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Read All Ideas */
router.get('/idea', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Ideas.find()
      .sort({'updated_date': -1})
      .exec(function(err, allIdeas) {
        if(err){
          return res.status(400).send({success:false, msg:'Cannot GET Ideas', error:err});
        }
        res.json(allIdeas);
      })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Update Idea */
router.put('/idea/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    if (req.params.id) {
      var updateData = {
        comment: req.body
      }
      Ideas.findOneAndUpdate({ _id:req.params.id }, updateData)
        .exec(function(err, idea) {
          if(err){
            return res.status(400).send({success:false, msg:'Cannot Update Idea', error:err});
          }
          return res.json({success:true, msg:'Successfully Updated', body: idea});
        });
    } else {
      return res.status(400).send({success:false, msg:'No Post ID Specified'});
    }
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;