var moment = require('moment');
var Counter = require('../../../models/counters/Counter');
var Controls_user = require('../../../models/controls/Controls_User');
var Controls_user_token = require('../../../models/controls/Controls_User_Token');
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