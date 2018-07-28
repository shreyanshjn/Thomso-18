var moment = require('moment');

var User = require("../../../../models/ca/CA_Admin");
var CA_Admin_Token = require("../../../../models/ca/CA_Admin_Token");
var TokenHelper = require("../../../../helpers/TokenHelper");

exports.register = function(req, res) {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
        req.body.username = req.body.username.trim()
    }
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successfully created new user.'});
        });
    }
};

exports.login = function(req, res) {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
        req.body.username = req.body.username.trim()
    }
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
    User.findOne({
        username: req.body.username
    })
    .select('username password')
    .exec(function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    User.updateOne({username: req.body.username},
                        {
                            $push: {
                                last_ip: {
                                    $each: [ ip ],
                                    $slice: -5
                                }
                            }
                        }, function(err) {
                            if(err){
                                return res.status(400).send({success:false, msg:'Error Saving IP', error:err});
                            }
                            var newToken = {
                                username: req.body.username,
                                user_id: user._id,
                                token: TokenHelper.generateAdminToken(req.body.username),
                                expirationTime: moment().day(30),
                            };
                            CA_Admin_Token.findOneAndUpdate({ username: req.body.username }, newToken, { upsert: true, new:true })
                            .exec(function(err, token) {
                                if (err) {
                                    return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                }
                                res.json({success: true, token: token.token, username: user.username});
                            });
                        }
                    );
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};
