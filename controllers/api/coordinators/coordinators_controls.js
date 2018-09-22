var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
var Winner_List = require('../../../models/coordinators/Winner_List');
var Main_User = require('../../../models/main/Main_User');
var Counter = require('../../../models/counters/Counter');
// var EventSchema = require('../../../models/main/Thomso_Event');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");

exports.info = (req, res) => {
    if(req && req.locals && req.locals.email){
        Coordinators_User.findOne({email: req.locals.email})
        .select(' name email ')
        .exec( (err, result) => {
            if(err) return res.status(400).send({success:false, msg:"Something went wrong"})
            else if(!result) return res.status(400).send({success:false, msg:"no user found"})
            res.json({success:true, body:result, msg:"User Found"})
        } )
    }else return res.status(400).send({success:false, msg:"Invalid Request"})
}