var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
var Winner_List = require('../../../models/coordinators/Winner_List');
// var Temp_User = require('../../../models/ca/CA_Temp_User');
var Counter = require('../../../models/counters/Counter');
// var EventSchema = require('../../../models/main/Thomso_Event');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");

exports.addWinner = (req, res) => {
    if(req.body){
        console.log(req.body)
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

        var data = {
            thomso_id:req.body.thomso_id,
            event_name:req.body.event_name,
            position:req.body.position,
            account_no:req.body.account_no,
            ifsc_code:req.body.ifsc_code,
            bank_name:req.body.bank_name,
            coordinator_name:req.body.coordinator_name,
        }
    }       
}
