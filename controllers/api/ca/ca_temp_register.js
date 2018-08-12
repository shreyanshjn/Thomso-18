var moment = require('moment');

var Temp_User = require('../../../models/ca/CA_Temp_User');
var CA_Temp_User_Token = require("../../../models/ca/CA_Temp_User_Token");
var Counter = require("../../../models/counters/Counter");
var TokenHelper = require("../../../helpers/TokenHelper");
var Generator = require("../../../helpers/GeneratePassword");
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
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                var newPass = Generator.generatePassword(20);
                if (newPass) {
                    var generateHash = Generator.generateHash(newPass);
                    generateHash.then(
                        function(newHash) {
                            if (newHash) {
                                var updateData = {
                                    password: newHash
                                };
                                Temp_User.update({ email: req.body.email }, updateData)
                                    .exec(function(err) {
                                        if (err) {
                                            return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                                        }
                                        res.json({success: true, msg: 'Successfully Registered'});
                                        mailer.caTempRegister({
                                            name: data.name,
                                            email: data.email,
                                            password: newPass
                                        });
                                    });
                            } else {
                                res.status(400).send({success:false, msg:'Promise Failed'});
                            }
                        }
                    )
                    .catch( function(err) {
                        res.status(400).send({success:false, msg:'Failed to generate new hash'});
                    })
                } else {
                    res.status(400).send({success:false, msg:'Failed to generate new password'});
                }
            });
        } else {
            res.status(400).send({success:false, msg:'Invalid Data'});
        }
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};

exports.ca_temp_login = function(req, res) {
    if (req.body) {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.email && req.body.password) {
            Temp_User.findOne({
                email: req.body.email
            })
            .select('name email verified password gender ca_id')
            .exec(function(err, user) {
                if (err) res.status(400).send({success: false, msg: 'Authentication failed. Error.'});
                if (!user) {
                    res.status(400).send({success: false, msg: 'Authentication failed. User not found.', notExists: true});
                } else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        console.log(user);
                        if (isMatch && !err) {
                            var newToken = {
                                email: req.body.email,
                                user_id: user._id,
                                verified: user.verified,
                                token: TokenHelper.generateUserToken(req.body.email, user._id),
                                expirationTime: moment().day(30),
                                updated_date: new Date()
                            };
                            CA_Temp_User_Token.findOneAndUpdate({ email: req.body.email }, newToken, { upsert: true, new:true })
                            .select('token')
                            .exec(function(err, token) {
                                if (err) {
                                    return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                }
                                var body = {
                                    _id: user._id,
                                    email: user.email,
                                    verfied: user.verfied,
                                    name: user.name,
                                    gender: user.gender
                                }
                                if (user.verified) {
                                    res.json({success: true, token: token.token, msg: 'Successfully Authenticated', temp: false, body: body});
                                } else {
                                    res.json({success: true, token: token.token, msg: 'Successfully Authenticated', temp: true, body: body});
                                }
                            });
                        } else {
                            res.status(400).send({success: false, msg: 'Authentication failed. Wrong password.', mismatch: true});
                        }
                    });
                }
            });
        } else {
            res.status(400).send({success:false, msg:'Invalid Data'});
        }
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};

exports.verify = function(req, res) {
    if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
        req.body.email = req.body.email.trim();
        Temp_User.findOne({
            email: req.body.email
        })
        .select('email name verified')
        .exec(function(err, user) {
            if (err) res.status(400).send({success: false, msg: 'Error.'});
            if (!user) {
                res.status(400).send({success: false, msg: 'Email not found.', notExists: true});
            } else {
                if (user.verified) {
                    res.json({success: true, msg: 'Email is already verified. Please login with your new password', retry: true});
                } else {
                    var newPass = Generator.generatePassword(20);
                    if (newPass) {
                        var generateHash = Generator.generateHash(newPass);
                        generateHash.then(
                            function(newHash) {
                                if (newHash) {
                                    var updateData = {
                                        password: newHash
                                    };
                                    Temp_User.update({ email: req.body.email }, updateData)
                                        .exec(function(err) {
                                            if (err) {
                                                return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                                            }
                                            res.json({success: true, msg: 'Verification Email Sent'});
                                            mailer.caTempRegister({
                                                name: user.name,
                                                email: user.email,
                                                password: newPass
                                            });
                                        });
                                } else {
                                    res.status(400).send({success:false, msg:'Promise Failed'});
                                }
                            })
                            .catch( function(err) {
                                res.status(400).send({success:false, msg:'Failed to generate new hash'});
                            })
                    } else {
                        res.status(400).send({success:false, msg:'Failed to generate new password'});
                    }
                }
            }
        });
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};

exports.reset = function(req, res) {
    if (req.locals.email && req.body.password && req.body.password.length >= 8) {
        Temp_User.findOne({
            email: req.locals.email
        })
        .select('email ca_id verified')
        .exec(function(err, user) {
            if (err) res.status(401).send({success: false, msg: 'Error.'});
            if (!user) {
                res.status(401).send({success: false, msg: 'User not found.'});
            } else {
                if (user.verified) {
                    res.json({success: true, msg: 'Email is already verified. Please login with your new password', retry: true});
                } else {
                    var generateHash = Generator.generateHash(req.body.password);
                    generateHash.then(
                        function(newHash) {
                            if (newHash && !user.ca_id) {
                                Counter.findByIdAndUpdate({_id: 'ca_temp_id'}, {$inc: { seq: 1} }, {upsert: true, new: true}, function(error, cnt)   {
                                    if (error) {
                                        return res.status(400).send({success: false, msg: 'Unable Create ID'});
                                    }
                                    var ca_id = "TH"+ 180000 + cnt.seq;
                                    var updateData = {
                                        password: newHash,
                                        verified: true,
                                        ca_id: ca_id
                                    };
                                    CA_Temp_User_Token.update({ email: req.locals.email }, {verified: true})
                                    .exec(function (err) {
                                            if (err) {
                                                console.log(err)
                                            }
                                    })
                                    Temp_User.findOneAndUpdate({ email: req.locals.email }, updateData, { new:true })
                                    .select('name email verfied gender ca_id')
                                    .exec(function(err, user) {
                                        if (err) {
                                            return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                                        }
                                        res.json({success: true, msg: 'Successfully Verified', body: user});
                                        mailer.caVerified({
                                            name: user.name,
                                            email: user.email,
                                        });
                                    });
                                })
                            } else if (newHash && user.ca_id) {
                                var updateData = {
                                    password: newHash,
                                    verified: true,
                                };
                                CA_Temp_User_Token.update({ email: req.locals.email }, {verified: true})
                                .exec(function (err) {
                                        if (err) {
                                            console.log(err)
                                        }
                                })
                                Temp_User.findOneAndUpdate({ email: req.locals.email }, updateData, { new:true })
                                .select('name email verfied gender ca_id')
                                .exec(function(err, user) {
                                    if (err) {
                                        return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                                    }
                                    res.json({success: true, msg: 'Successfully Updated Password', body: user});
                                    mailer.caVerified({
                                        name: user.name,
                                        email: user.email,
                                    });
                                });
                            } else {
                                res.status(400).send({success:false, msg:'Promise Failed'});
                            }
                        })
                        .catch( function(err) {
                            res.status(400).send({success:false, msg:'Failed to generate new hash'});
                        })
                }
            }
        });
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};
