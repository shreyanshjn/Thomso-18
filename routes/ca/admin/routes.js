var express = require('express');
var router = express.Router();

// Controllers
var adminAuth = require('../../../controllers/api/ca/admin/admin_auth');
var adminControls = require('../../../controllers/api/ca/admin/admin_controls');

// Middlewares
var CAAdminTokenMiddleware = require("../../../middlewares/ca/admin/TokenMiddleware");

// Routes

// -> /ca/admin/auth
router.post('/auth/register', adminAuth.register);
router.post('/auth/login', adminAuth.login);

// -> /ca/admin
router.use('/', CAAdminTokenMiddleware.verify);

router.get('/participants', adminControls.getParticipant);
router.get('/ideas', adminControls.getIdeas);
router.put('/idea/:id', adminControls.putIdea);

/* Read All Ideas */
router.get('/idea', function(req, res) {
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
router.put('/idea/:id', function(req, res) {
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