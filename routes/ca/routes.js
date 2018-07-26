var express = require('express');
var request = require('request');

var router = express.Router();

var Users = require('../../models/ca/CA_User');
var Ideas = require('../../models/ca/CA_Idea');

/* GET all Posts */
router.get('/posts', function(req, res) {
  Users.findOne({
    fb_id: req.locals.fb_id
  }, function (err, user) {
    if (err) return next(err);
    var fb_auth_token = user.access_token;
    request(`https://graph.facebook.com/v3.0/171774543014513?fields=posts.limit(100){created_time,id,full_picture,message,link}&access_token=${fb_auth_token}`, function(err, response, body){
      if (err) return next(err);
      if (response.statusCode) {
          return res.status(response.statusCode).send(body);
      }
      return res.status(400).send({success: false, msg: 'Facebook didnt return status.'});
    })
  });
});

/* PUT Shared Post ID */
router.put('/posts/:post_id', function(req, res) {
  if (req.params.post_id) {
    var post_id = req.params.post_id;
    Users.updateOne({fb_id: req.locals.fb_id}, {$addToSet: { posts: post_id }}, function(err) {
      if(err){
        return res.status(400).send({success:false, msg:'Error Updating User', error:err});
      }
      return res.json({success:true, msg:'Post Successfully Shared'});
    })
  } else {
    return res.status(400).send({success:false, msg:'Invalid Post ID Specified'});
  }
});

/* Create Idea */
router.post('/idea', function(req, res) {
  if (req.body && req.body.title && req.body.body) {
    var newData = {
      fb_id: req.locals.fb_id,
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
});

/* Read All Ideas */
router.get('/idea', function(req, res) {
  Ideas.find({fb_id: req.locals.fb_id, deleted: false})
    .select('title body comment')
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
      title: req.body.title,
      body: req.body.body
    }
    Ideas.findOneAndUpdate({ fb_id: req.locals.fb_id, _id:req.params.id }, updateData, (err, idea) => {
      if(err){
        return res.status(400).send({success:false, msg:'Cannot Update Idea', error:err});
      }
      return res.json({success:true, msg:'Successfully Updated', body: idea});
    })
  } else {
    return res.status(400).send({success:false, msg:'No Post ID Specified'});
  }
});

/* Remove Idea */
router.delete('/idea/:id', function(req, res) {
  if (req.params.id) {
    var updateData = {
      deleted: true
    };
    Ideas.update({ fb_id: req.locals.fb_id, _id:req.params.id }, updateData, (err) => {
      if(err){
        return res.status(400).send({success:false, msg:'Cannot Delete Idea', error:err});
      }
      return res.json({success:true, msg:'Successfully Deleted'});
    })
  } else {
    return res.status(400).send({success:false, msg:'No Post ID Specified'});
  }
});

/* GET Leaderboard */
router.get('/leaderboard', function(req, res) {
  Users.find({ blocked: false })
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
});

module.exports = router;