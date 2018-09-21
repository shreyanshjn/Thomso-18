var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
// var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
// var Temp_User = require('../../../models/ca/CA_Temp_User');
var Counter = require('../../../models/counters/Counter');
// var EventSchema = require('../../../models/main/Thomso_Event');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");

exports.coordinator_registration = function (req, res) {
    if (req.body) {
        console.log(req.body, "sd")
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.contact1) {
            req.body.contact1 = req.body.contact1.trim();
        }
        if (req.body.contact2) {
            req.body.contact2 = req.body.contact2.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.gender) {
            req.body.gender = req.body.gender.trim();
        }
        if (req.body.bhawan) {
            req.body.bhawan = req.body.bhawan.trim();
        }
        if (req.body.year) {
            req.body.year = req.body.year.trim();
        }
        if (req.body.branch) {
            req.body.branch = req.body.branch.trim();
        }
        if (req.body.enrollment_no) {
            req.body.enrollment_no = req.body.enrollment_no.trim();
        }
        if (req.body.event_id) {
            req.body.event_id = req.body.event_id.trim();
        }
        var data = {
            name: req.body.name,
            contact1: req.body.contact1,
            contact2: req.body.contact2,
            email: req.body.email,
            gender: req.body.gender,
            bhawan: req.body.bhawan,
            year: req.body.year,
            branch: req.body.branch,
            enrollment_no: req.body.enrollment_no,
            event_id: req.body.event_id
        };
        console.log(data);
        if (data.name && data.contact1 && data.contact2 && data.email && data.gender && data.bhawan && data.year && data.branch && data.enrollment_no && data.event_id) {
            var newUser = new Coordinators_User(data);
            newUser.save(function (err) {
                if (err) {
                    console.log(err)
                    return res.json({ success: false, msg: 'Username already exists.' });
                }
                var newPass = Generator.generatePassword(20);
                if (newPass) {
                    var generateHash = Generator.generateHash(newPass);
                    generateHash.then(
                        function (newHash) {
                            if (newHash) {
                                var updateData = {
                                    password: newHash
                                };
                                Coordinators_User.updateOne({ email: req.body.email }, updateData)
                                    .exec(function (err) {
                                        if (err) {
                                            return res.status(400).send({ success: false, msg: 'Unable Update Hash' });
                                        }
                                        Counter.findByIdAndUpdate({ _id: 'coordinators_id' }, { $inc: { seq: 1 } }, { upsert: true, new: true }, function (error, cnt) {
                                            if (error) {
                                                return res.status(400).send({ success: false, msg: 'Unable Create ID' });
                                            }
                                            res.json({ success: true, msg: 'Successfully Registered' });
                                        })
                                    });
                            } else {
                                res.status(400).send({ success: false, msg: 'Promise Failed' });
                            }
                        }
                    )
                        .catch(function (err) {
                            res.status(400).send({ success: false, msg: 'Failed to generate new hash' });
                        })
                } else {
                    res.status(400).send({ success: false, msg: 'Failed to generate new password' });
                }
            });
        } else {
            res.status(400).send({ success: false, msg: 'Invalid Data' });
        }
    } else {
        res.status(400).send({ success: false, msg: 'Invalid Data' });
    }
};

