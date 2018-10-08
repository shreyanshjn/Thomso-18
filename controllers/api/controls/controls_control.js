var moment = require('moment');
var Counter = require('../../../models/counters/Counter');
var Controls_user = require('../../../models/controls/Controls_User');
var Controls_user_token = require('../../../models/controls/Controls_User_Token');
var User_controls = require('../../../models/main/Main_User');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");

exports.info = (req, res) => {
    if(req && req.locals && req.locals.email){
        Controls_user.findOne({email: req.locals.email})
        .select(' name email ')
        .exec( (err, result) => {
            if(err) return res.status(400).send({success:false, msg:"Something went wrong"})
            else if(!result) return res.status(400).send({success:false, msg:"no user found"})
            res.json({success:true, body:result, msg:"User Found"})
        } )
    }else return res.status(400).send({success:false, msg:"Invalid Request"})
}

exports.user_info = (req, res) => {
    console.log(req.body)
    if(req && req.body && req.body.thomso_id){
       User_controls.findOne({thomso_id:req.body.thomso_id})
       .select(' name email contact thomso_id college state branch referred_by gender address')
       .exec( (err, result) => {
            if(err) return res.status(400).send({success:false, msg:"Something went wrong"})
            if(!result) return res.status(400).send({success:false, msg:"No User With This ID."})
            else res.json({success:false, body:result, msg:"USER FOUND"})     
       } ) 
    }else return res.status(400).send({success:false, msg:"Invalid Request"})
}

exports.payment_update = (req, res) => {
    if(req && req.body && req.body.thomso_id && req.body.payment && req.body.accomodation){
       User_controls.findOneAndUpdate({thomso_id:req.body.thomso_id}, {payment:req.body.payment, accomodation:req.body.accomodation})
       .exec( (err) => {
            if(err) return res.status(400).send({success:false, msg:"Something went wrong"})
            res.json({success:false,msg:"Updated"})     
       } ) 
    }else return res.status(400).send({success:false, msg:"Invalid Request"})
}