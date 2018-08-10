var moment = require('moment');

var Temp_User = require('../../../models/ca/CA_Temp_User');
var CA_Temp_User_Token = require("../../../models/ca/CA_Temp_User_Token");
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
                var newPass = Generator.generatePassword(10);
                if (newPass) {
                    var newHash = Generator.generateHash(newPass);
                    if (newHash) {
                        var updateData = {
                            password: newHash
                        };
                        Temp_User.update({ email: req.body.email }, updateData)
                            .exec(function(err) {
                                if (err) {
                                    return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                                }
                                res.json({success: true, msg: 'Successfully Registered', email: user.email});
                                mailer.caTempRegister({
                                    name: data.name,
                                    email: data.email,
                                    password: newPass
                                });
                            });
                    } else {
                        res.status(400).send({success:false, msg:'Failed to generate new hash'});
                    }
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
            .select('email temp_password verified password')
            .exec(function(err, user) {
                if (err) res.status(401).send({success: false, msg: 'Authentication failed. Error.'});
                if (!user) {
                    res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    if (user.verified) {
                        user.comparePassword(req.body.password, function (err, isMatch) {
                            if (isMatch && !err) {
                                var newToken = {
                                    email: req.body.email,
                                    user_id: user._id,
                                    token: TokenHelper.generateUserToken(email, user._id),
                                    expirationTime: moment().day(30),
                                    updated_date: new Date()
                                };
                                CA_Temp_User_Token.findOneAndUpdate({ email: req.body.email }, newToken, { upsert: true, new:true })
                                .select('token')
                                .exec(function(err, token) {
                                    if (err) {
                                        return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                    }
                                    res.json({success: true, token: token.token, email: user.email});
                                });
                            } else {
                                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                            }
                        });
                    } else {
                        user.compareTempPassword(req.body.password, function (err, isMatch) {
                            if (isMatch && !err) {
                                var newToken = {
                                    email: req.body.email,
                                    user_id: user._id,
                                    token: TokenHelper.generateUserToken(email, user._id),
                                    expirationTime: moment().day(30),
                                    updated_date: new Date()
                                };
                                CA_Temp_User_Token.findOneAndUpdate({ email: req.body.email }, newToken, { upsert: true, new:true })
                                .select('token')
                                .exec(function(err, token) {
                                    if (err) {
                                        return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                    }
                                    res.json({success: true, token: token.token, email: user.email, temp: true});
                                });
                            } else {
                                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                            }
                        });
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

exports.verify = function(req, res) {
    if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
        req.body.email = req.body.email.trim();
        Temp_User.findOne({
            email: req.body.email
        })
        .select('email name verified')
        .exec(function(err, user) {
            if (err) res.status(401).send({success: false, msg: 'Error.'});
            if (!user) {
                res.status(401).send({success: false, msg: 'Email not found.'});
            } else {
                if (user.verified) {
                    res.json({success: true, msg: 'Email is already verified. Please login with your new password', retry: true});
                } else {
                    var newPass = Generator.generatePassword(10);
                    if (newPass) {
                        var newHash = Generator.generateHash(newPass);
                        if (newHash) {
                            var updateData = {
                                password: newHash
                            };
                            Temp_User.update({ email: req.body.email }, updateData)
                                .exec(function(err) {
                                    if (err) {
                                        return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                                    }
                                    res.json({success: true, msg: 'Verification Email Sent', email: user.email});
                                    mailer.caTempRegister({
                                        name: user.name,
                                        email: user.email,
                                        password: newPass
                                    });
                                });
                        } else {
                            res.status(400).send({success:false, msg:'Failed to generate new hash'});
                        }
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
    if (req.locals.email && req.body.password) {
        Temp_User.findOne({
            email: req.locals.email
        })
        .select('email temp_password verified')
        .exec(function(err, user) {
            if (err) res.status(401).send({success: false, msg: 'Error.'});
            if (!user) {
                res.status(401).send({success: false, msg: 'User not found.'});
            } else {
                if (user.verified) {
                    res.json({success: true, msg: 'Email is already verified. Please login with your new password', retry: true});
                } else {
                    var newHash = Generator.generateHash(req.body.password);
                    if (newHash) {
                        var updateData = {
                            password: newHash
                        };
                        Temp_User.findOneAndUpdate({ email: req.locals.email }, updateData, { new:true })
                        .select('name email')
                        .exec(function(err, user) {
                            if (err) {
                                return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                            }
                            var newToken = {
                                email: req.locals.email,
                                user_id: user._id,
                                token: TokenHelper.generateUserToken(email, user._id),
                                expirationTime: moment().day(30),
                                updated_date: new Date()
                            };
                            CA_Temp_User_Token.findOneAndUpdate({ email: req.locals.email }, newToken, { upsert: true, new:true })
                            .select('token')
                            .exec(function(err, token) {
                                if (err) {
                                    return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                }
                                res.json({success: true, token: token.token, email: user.email});
                                mailer.caVerified({
                                    name: user.name,
                                    email: user.email,
                                });
                            });
                        });
                    } else {
                        res.status(400).send({success:false, msg:'Failed to generate new hash'});
                    }
                }
            }
        });
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};
