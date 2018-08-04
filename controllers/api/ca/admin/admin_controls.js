var Users = require('../../../../models/ca/CA_User');
var Ideas = require('../../../../models/ca/CA_Idea');
// const fs = require('fs');
// const moment = require('moment');
// const json2csv = require('json2csv').parse;
// const path = require('path')
// // const fields = ['name'];
// const mongotocsv = require('mongo-to-csv');
// var csv = require('csv');


/* GET ALL Users */
exports.getParticipant = function(req, res) {
  Users.find({created:true})
  .select('ca_id name gender image email branch contact college state address why link blocked')
  .exec(function (err, allUsers) {
    if (err) return res.status(400).send({success:false, msg:'Unable to GET Participants', error:err});
    res.json(allUsers);
  });
};

/* GET ALL Users */
exports.getScoreList = function(req, res) {
  Users.find({created:true})
  .select('ca_id name gender likes shares score ideas bonus blocked')
  .exec(function (err, allUsers) {
    if (err) return res.status(400).send({success:false, msg:'Unable to GET Score', error:err});
    res.json(allUsers);
  });
};

/* Read All Ideas */
exports.getIdeas = function(req, res) {
  Ideas.find()
    .populate('user', 'name image ca_id')
    .select('title body comment deleted updated_date')
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
            comment: req.body.comment
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

/* Delete Idea */
exports.deleteIdea = function(req, res) {
    if (req.params.id) {
        var updateData = {
            deleted: req.body.deleted
        }
        Ideas.findOneAndUpdate({ _id: req.params.id }, updateData, { new:true })
        .select('deleted')
        .exec(function(err, idea) {
            if(err){
                return res.status(400).send({success:false, msg:'Cannot Switch Delete', error:err});
            }
            return res.json({success:true, msg:'Delete Switch Success', body: idea});
        });
    } else {
        return res.status(400).send({success:false, msg:'No Post ID Specified'});
    }
};

/* Block User */
exports.blockUser = function(req, res) {
    if (req.params.id && req.body.blocked !== undefined) {
        var updateData = {
            blocked: req.body.blocked
        };
        Users.findOneAndUpdate({ _id:req.params.id }, updateData, { new:true })
        .select('blocked')
        .exec(function(err, user) {
            if(err){
                return res.status(400).send({success:false, msg:'Failed to switch block', error:err});
            }
            return res.json({success:true, msg:'Successfully Updated', body: user});
        });
    } else {
        return res.status(400).send({success:false, msg:'No User ID Specified'});
    }
};

exports.exportToCSV = function(req, res) {
    // var filename   = "participant.csv";
    // var dataArray;
    // console.log('hello');
    Users.find({}).select('name email contact gender branch address ca_id contact ideas score state why').lean().exec({}, function(err, participant) {
        // console.log(participant);
        // const fields = ['name'];
        // var csv = json2csv({ data: participant, fields: fields });
        if (err) {
            return res.json({ success:false, msg: 'Unable to fetch data', error:err })
        }
        else{
            // console.log(participant);
            if(participant){
                res.json({ success:true, data: participant });
            }
            else{
                res.json({ success:false, error:err, msg: 'Something went Wrong' });   
            }
            
        }
        
        // res.statusCode = 200;
        // fs.writeFile('../../file.csv', csv, function(err) {
        //     if (err) throw err;
        //     // console.log(csv);
        //      res.send("done");
        //   });

        // res.setHeader('Content-Type', 'text/csv');

        // res.setHeader("Content-Disposition", 'attachment; filename='+filename);

        // res.csv(participant, true);

    });

  };
