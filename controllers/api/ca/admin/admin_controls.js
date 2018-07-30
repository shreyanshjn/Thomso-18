var Users = require('../../../../models/ca/CA_User');
var Ideas = require('../../../../models/ca/CA_Idea');

/* GET ALL Users */
exports.getParticipant = function(req, res) {
  Users.find({created:true})
  .select('address name fb_id college contact branch ca_id state image gender email why blocked')
  .exec(function (err, allUsers) {
    if (err) return next(err);
    res.json(allUsers);
  });
};

/* Read All Ideas */
exports.getIdeas = function(req, res) {
  Ideas.find()
    .populate('user', 'name image ca_id')
    .select('title body comment')
    .sort({'updated_date': -1})
    .exec(function(err, allIdeas) {
      if(err){
        return res.status(400).send({success:false, msg:'Cannot GET Ideas', error:err});
      }
      res.json(allIdeas);
    })
};

/* Update Idea */
exports.putIdea = function(req, res) {
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
};
