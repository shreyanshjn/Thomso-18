var express = require('express');
var request = require('request');

var router = express.Router();

var passport = require('passport');
require('../../config/ca/fb_passport')(passport)

var Users = require('../../models/ca/CA_User');
var Ideas = require('../../models/ca/CA_Idea');

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

/* GET all Posts */
router.get('/posts', passport.authenticate('jwt', { session: false }), function(req, res) {
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

/* PUT Shared Post ID */
router.put('/posts/:post_id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    if (req.params.post_id) {
      var post_id = req.params.post_id;
      Users.updateOne({fb_id: req.user.fb_id}, {$addToSet: { posts: post_id }}, function(err) {
        if(err){
          return res.status(400).send({success:false, msg:'Error Updating User', error:err});
        }
        return res.json({success:true, msg:'Post Successfully Shared'});
      })
    } else {
      return res.status(400).send({success:false, msg:'No Post ID Specified'});
    }
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Create Idea */
router.post('/idea', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    if (req.body && req.body.title && req.body.body) {
      var newData = {
        fb_id: req.user.fb_id,
        title: req.body.title,
        body: req.body.body
      }
      Ideas.create(newData, function (err, post) {
        if(err){
          return res.status(400).send({success:false, msg:'Error Posting Idea', error:err});
        }
        return res.json({success:true, msg:'Idea Successfully Posted', body: post});
      });
    } else {
      return res.status(400).send({success:false, msg:'Invalid Params'});
    }
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Read All Ideas */
router.get('/idea', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Ideas.find({fb_id: req.user.fb_id, deleted: false})
      .select('title body comment')
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
        title: req.body.title,
        body: req.body.body
      }
      Ideas.findOneAndUpdate({ fb_id: req.user.fb_id, _id:req.params.id }, updateData, (err, idea) => {
        if(err){
          return res.status(400).send({success:false, msg:'Cannot Update Idea', error:err});
        }
        return res.json({success:true, msg:'Successfully Updated', body: idea});
      })
    } else {
      return res.status(400).send({success:false, msg:'No Post ID Specified'});
    }
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Remove Idea */
router.delete('/idea/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    if (req.params.id) {
      var updateData = {
        deleted: true
      };
      Ideas.update({ fb_id: req.user.fb_id, _id:req.params.id }, updateData, (err) => {
        if(err){
          return res.status(400).send({success:false, msg:'Cannot Delete Idea', error:err});
        }
        return res.json({success:true, msg:'Successfully Deleted'});
      })
    } else {
      return res.status(400).send({success:false, msg:'No Post ID Specified'});
    }
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* GET Leaderboard */
router.get('/leaderboard', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
<<<<<<< HEAD
    Users.find({ blocked: false })
=======
    Users.find()
>>>>>>> f1ed10f1debe2d5bd31af6bca75dba9d599856d2
      .select('name likes college score referrals shares')
      .sort({'score': -1})
      .limit(10)
      .exec(function(err, allUsers) {
        console.log(allUsers);
        if(err){
          return res.status(400).send({success:false, msg:'Cannot GET Leaders', error:err});
        }
        res.json(allUsers);
      })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;