// var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
// var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
// var Winner_List = require('../../../models/coordinators/Winner_List');
// var Main_User = require('../../../models/main/Main_User');
// var Counter = require('../../../models/counters/Counter');
var EventSchema = require('../../../models/main/Thomso_Event');
// var TokenHelper = require('../../../helpers/TokenHelper');
// var Generator = require("../../../helpers/GeneratePassword");

exports.info = function(req, res) {
    if(req && req.locals && req.locals.email){
        Coordinators_User.findOne({email: req.locals.email})
        .select(' name email event_id')
        .exec( (err, result) => {
            if(err) return res.status(400).send({success:false, msg:"Something went wrong"});
            else if(!result) return res.status(400).send({success:false, msg:"no user found"});
            res.json({success:true, body:result, msg:"User Found"});
        } )
    }else return res.status(400).send({success:false, msg:"Invalid Request"});
}

exports.participants = function(req, res) {
    if(req.body && req.body.event_id && req.locals && req.locals.email){
        EventSchema.findOne({event_id: req.body.event_id})
        .populate('users', 'thomso_id college name email contact gender payment_type blocked')
        .select(' name ')
        .exec( (err, result) => {
            if(err){ 
                return res.status(400).send({success:false, msg:"Event ID wrong"});
            }
            else if(!result) return res.status(400).send({success:false, msg:"No participants"});
            res.json({success:true, msg:"User fetched", body:result});
        } )
    }else return res.status(400).send({success:false, msg:"Invalid Request"});
}