var request = require('request');
var express = require('express');
var moment = require('moment');
var router = express.Router();

var CA_User = require("../../models/ca/CA_User");
var CA_User_Token = require("../../models/ca/CA_User_Token");
var TokenHelper = require("../../helpers/TokenHelper");
var client_id = process.env.REACT_APP_FB_ID;
var client_secret = process.env.FACEBOOK_APP_SECRET;

// Login using Facebook
exports.fblogin = function(req, res) {
    var accessToken = req.body.accessToken;
    var data = {
        fb_id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        image: req.body.image
    }
    request(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${accessToken}`, function(err, response, body){
        var access_token = JSON.parse(response.body).access_token;
        console.log( req.body.id, 'access_toke');
        
        var saveData = Object.assign(data, {access_token: access_token})
        CA_User.findOne({
            fb_id: req.body.id
        }, function(err, user) {
            if (err) {
                return res.status(400).send({
                    success:false,
                    msg: 'Unable to connect to database. Please try again.',
                    error: err
                })
            }
            if (!user) {
                // Return Data
                var newUser = new CA_User(saveData);
                console.log(newUser);
                newUser.save(function(err, user) {
                    if (err) {
                        console.log(err);
                        
                        return res.status(400).send({success: false, msg: 'Unable to Add Use'});
                    }
                    var newToken = {
                        fb_id: req.body.id,
                        token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                        expirationTime: moment().day(30),
                    };
                    CA_User_Token.findOneAndUpdate({ fb_id: req.body.id }, newToken, { upsert: true, new:true }, function(err, token) {
                        if (err) {
                            return res.status(400).send({success: false, msg: 'Unable Create Token'});
                        }
                        res.json({success: true, msg: 'New User, Created False', token: token.token, new: true, body:user});
                    });
                });
            } else {
                // Update User
                if (user.created) {
                    CA_User.findOneAndUpdate({fb_id: req.body.id}, saveData, { new:true }, function(err, user) {
                        if(err){
                            return res.status(400).send({success:false, msg:'Error Updating User', error:err});
                        }
                        var newToken = {
                            fb_id: req.body.id,
                            token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                            expirationTime: moment().day(30),
                        };
                        CA_User_Token.findOneAndUpdate({ fb_id: req.body.id }, newToken, { upsert: true, new:true }, function(err, token) {
                            if (err) {
                                return res.status(400).send({success: false, msg: 'Unable Create Token'});
                            }
                            res.json({success: true, msg:'User Successfully Updated', token: token.token, new: true, body:user});
                        });
                    })
                } else {
                    var newToken = {
                        fb_id: req.body.id,
                        token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                        expirationTime: moment().day(30),
                    };
                    CA_User_Token.findOneAndUpdate({ fb_id: req.body.id }, newToken, { upsert: true, new:true }, function(err, token) {
                        if (err) {
                            return res.status(400).send({success: false, msg: 'Unable Create Token'});
                        }
                        res.json({success: true, msg: 'New User, Creating...', token: token.token, new: true, body:user});
                    });
                }
            }
        });
    })
};

// Register Using Facebook
exports.fbRegister = function(req, res) {
    // console.log(req.locals);
    CA_User.findOne({
        fb_id: req.locals.fb_id
    }, function(err, user) {
        if (err) {
            return res.status(400).send({
                success:false,
                msg: 'Unable to connect to database. Please try again.',
                error: err
            })
        }
        if (!user) {
            return res.status(400).send({success: false, msg: 'User Not Found'});
        } else {
            var data = {
                name: req.body.name,
                contact: req.body.contact,
                email: req.body.email,
                gender: req.body.gender,
                college: req.body.college,
                state: req.body.state,
                branch: req.body.branch,
                address: req.body.address,
                why: req.body.why,
                created: true
            }
            CA_User.findOneAndUpdate({fb_id: req.locals.fb_id}, data, { new:true }, function(err, user) {
                if(err){
                    return res.status(400).send({success:false, msg:'Error Creating User', error:err});
                }
                var newToken = {
                    fb_id: req.locals.fb_id,
                    token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                    expirationTime: moment().day(30),
                };
                CA_User_Token.findOneAndUpdate({ fb_id: req.locals.fb_id }, newToken, { upsert: true, new:true }, function(err, token) {
                    if (err) {
                        return res.status(400).send({success: false, msg: 'Unable Create Token'});
                    }
                    res.json({success: true, msg: 'User Created', token: token.token, new: true, body:user});
                });
            })
        }
    });
};
