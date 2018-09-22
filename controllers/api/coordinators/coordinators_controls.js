var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
var Winner_List = require('../../../models/coordinators/Winner_List');
var Main_User = require('../../../models/main/Main_User');
var Counter = require('../../../models/counters/Counter');
// var EventSchema = require('../../../models/main/Thomso_Event');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");

exports.addWinner = (req, res) => {
    if(req.body && req.body.thomso_id && req.body.event_name && req.body.position && req.body.account_no && req.body.bank_name && req.body.ifsc_code && req.body.coordinator_email){
        console.log(req.body.thomso_id,'1')
        if (req.body.thomso_id) {
            req.body.thomso_id = req.body.thomso_id.trim();
        }
        if (req.body.event_name) {
            req.body.event_name = req.body.event_name.trim();
        }
        if (req.body.position) {
            req.body.position = req.body.position.trim();
        }
        if (req.body.account_no) {
            req.body.account_no = req.body.account_no.trim();
        }
        if (req.body.ifsc_code) {
            req.body.ifsc_code = req.body.ifsc_code.trim();
        }
        if (req.body.bank_name) {
            req.body.bank_name = req.body.bank_name.trim();
        }
        if (req.body.coordinator_email) {
            req.body.coordinator_email = req.body.coordinator_email.trim();
        }

        var data = {
            thomso_id:req.body.thomso_id,
            event_name:req.body.event_name,
            position:req.body.position,
            account_no:req.body.account_no,
            ifsc_code:req.body.ifsc_code,
            bank_name:req.body.bank_name,
            coordinator_email:req.body.coordinator_email,
        }

        if(data && data.thomso_id && data.event_name && data.account_no && data.position && data.bank_name && data.coordinator_email && data.account_no){
        console.log(req.body.thomso_id,'2')
            Main_User.findOne({thomso_id:data.thomso_id})
            .select('name college email contact')
            .exec( (errr, result) => {
                if(errr) return res.status(400).send({success:false, msg:"winner data not found"})
                var newUser = new Winner_List(data);

                console.log(req.body.thomso_id,'5')
                data = {
                    college:result.college,
                    name:result.name,
                    email:result.email,
                    contact:result.contact
                }
                newUser.save( function(err){
                    if(err) {
                        console.log(err,'1')
                        return res.status(400).send({success:false, msg:"Something Went Wrong"})
                    }
                    console.log(req.body.thomso_id,'3')

                    Counter.findByIdAndUpdate({ _id: 'winners_count' }, { $inc: { seq: 1 } }, { upsert: true, new: true }, function (error) {
                        if(error) {return res.status(400).send({success:false, msg:"unable to add count"})}
                            res.json({ success: true, msg: 'Successfully Registered' });
                    })
                } )
                .catch( r => {
                    res.status(400).send({success:false, msg:"Something Went Wrong"})
                })
            }) 
        }
        else{
            return res.status(400).send({success:false, msg:"Something Went Wrong"})
        }
    } else{
       return res.status(400).send({success:false, msg:"Something Went Wrong"})
    }       
}

exports.getWinner = (req, res) => {
    if(req.body && req.body.email){
        Winner_List.find({ coordinator_email: req.body.email })
        .exec( (err, result) => {
            if(err) return res.status(400).send({success: false, msg:"No Data"});
            res.json({success:true, body:result, msg:"Fetched Successfully!!"})
        } )
    }else return res.status(400).send({msg:"Invalid Data", success:false})
}