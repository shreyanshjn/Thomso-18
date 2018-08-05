var Temp_User = require('../../../models/ca/CA_Temp_User');
var mailer = require('../../common/mailer');

exports.ca_temp_register = function(req, res) {
    if (req.body) {
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.contact) {
            req.body.contact = req.body.contact.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.gender) {
            req.body.gender = req.body.gender.trim();
        }
        if (req.body.college) {
            req.body.college = req.body.college.trim();
        }
        if (req.body.state) {
            req.body.state = req.body.state.trim();
        }
        if (req.body.branch) {
            req.body.branch = req.body.branch.trim();
        }
        if (req.body.address) {
            req.body.address = req.body.address.trim();
        }
        if (req.body.why) {
            req.body.why = req.body.why.trim();
        }
        var data = {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            gender: req.body.gender,
            college: req.body.college,
            state: req.body.state,
            branch: req.body.branch,
            address: req.body.address,
            why: req.body.why
        };
        if (data.name && data.contact && data.email && data.gender && data.college && data.state && data.branch && data.address && data.why) {
            var newUser = new Temp_User(data);
            newUser.save(function(err) {
                if (err) {
                    mailer.caTempMailer(data);
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successfully created new user.'});
                mailer.caTempMailer(data);
            });
        } else {
            res.status(400).send({success:false, msg:'Invalid Data'});
        }
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};