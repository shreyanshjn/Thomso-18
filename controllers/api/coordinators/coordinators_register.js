var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
var Temp_User = require('../../../models/ca/CA_Temp_User');
var Counter = require('../../../models/counters/Counter');
var EventSchema = require('../../../models/main/Thomso_Event');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");
var mailer = require('../../common/mailer');

var requiredVars = 'name email gender thomso_id college address contact verified';

exports.participant_registration = function (req, res) {
};