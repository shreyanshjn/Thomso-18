var Zonal_User = require('../../../models/zonals/Zonals_Registration');
var mailer = require('../../common/mailer');

var register = function(req, res, city) {
    if (req.body) {
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.college) {
            req.body.college = req.body.college.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.branch) {
            req.body.branch = req.body.branch.trim();
        }
        if (req.body.contact) {
            req.body.contact = req.body.contact.trim();
        }
        if (city) {
            city = city.trim();
        }
        var data = {
            name: req.body.name,
            college: req.body.college,
            email: req.body.email,
            branch: req.body.branch,
            contact: req.body.contact,
            events: req.body.events,
            city: city
        };
        if (data.name && data.college && data.email && data.branch && data.contact && data.city && typeof(data.events) === "object" && data.events.length > 0 ) {
            var newUser = new Zonal_User(data);
            newUser.save(function(err, saved) {
                if (err) {
                    return res.json({success: false, msg: 'Error', error: err});
                } else if (!saved) {
                    return res.json({success: false, msg: 'Email already exists.'});
                } else {
                    res.json({success: true, msg: 'Successfully Registered'});
                    if (saved.tz_id && saved.email && saved.name) {
                        mailer.zonalsLucknow({
                            zn_id: saved.tz_id,
                            email: saved.email,
                            name: saved.name
                        })
                    }
                }
            });
        } else {
            res.status(400).send({success:false, msg:'Invalid Data'});
        }
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};

exports.register_delhi = function (req, res) {
    register(req, res, 'Delhi')
}

exports.register_jaipur = function (req, res) {
    register(req, res, 'Jaipur')
}

exports.register_lucknow = function (req, res) {
    register(req, res, 'Lucknow')
}
