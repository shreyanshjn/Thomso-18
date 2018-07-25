var express = require('express');
var router = express.Router();

var Users = require('../../../models/ca/CA_User');


/* GET ALL Users */
router.get('/participants', function(req, res) {
  Users.find(function (err, allUsers) {
    if (err) return next(err);
    res.json(allUsers);
  });
});

/* Read All Ideas */
router.get('/idea', function(req, res) {
  Ideas.find()
    .sort({'updated_date': -1})
    .exec(function(err, allIdeas) {
      if(err){
        return res.status(400).send({success:false, msg:'Cannot GET Ideas', error:err});
      }
      res.json(allIdeas);
    })
});

/* Update Idea */
router.put('/idea/:id', function(req, res) {
  if (req.params.id) {
    var updateData = {
      comment: req.body
    }
    Ideas.findOneAndUpdate({ _id:req.params.id }, updateData, { new:true })
      .exec(function(err, idea) {
        if(err){
          return res.status(400).send({success:false, msg:'Cannot Update Idea', error:err});
        }
        return res.json({success:true, msg:'Successfully Updated', body: idea});
      });
  } else {
    return res.status(400).send({success:false, msg:'No Post ID Specified'});
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