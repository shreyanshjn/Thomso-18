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

module.exports = router;