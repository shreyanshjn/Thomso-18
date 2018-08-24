var moment = require('moment');
var Main_User = require('../../../models/main/Main_User');
var Main_User_Token = require('../../../models/main/Main_User_Token');
var Temp_User = require('../../../models/ca/CA_Temp_User');
var Counter = require('../../../models/counters/Counter');
var EventSchema = require('../../../models/main/Thomso_Event');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");
var mailer = require('../../common/mailer');

var requiredVars = 'name email gender thomso_id college address contact verified';

exports.participant_registration = function (req, res) {
    if (req.body) {
        if (req.body.name) req.body.name = req.body.name.trim();
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.contact) req.body.contact = req.body.contact.trim();
        if (req.body.gender)  req.body.gender = req.body.gender.trim();
        if (req.body.college) req.body.college = req.body.college.trim();
        if (req.body.state)  req.body.state = req.body.state.trim();
        if (req.body.branch)  req.body.branch = req.body.branch.trim();
        if (req.body.address)  req.body.address = req.body.address.trim();
        if (req.body.primary_event)  req.body.primary_event = req.body.primary_event.trim();
        if (req.body.referred_by)  req.body.referred_by = req.body.referred_by.trim();
            else  req.body.referred_by = null
        var data = {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            gender: req.body.gender,
            college: req.body.college,
            state: req.body.state,
            branch: req.body.branch,
            address: req.body.address,
            primary_event: req.body.primary_event,
            password: req.body.password,
            referred_by: req.body.referred_by,
            otp: '1511'
        };
        if (data.name && data.contact && data.email && data.gender && data.college && data.state && data.branch && data.address && data.primary_event && data.password) {
            var newUser = Main_User(data);
            newUser.save(function(err){
                if(err)
                    return res.json({ success: false, msg: 'Username already exist'});
                var otp = '1511';    
                var generateHash = Generator.generateHash(req.body.password);
                generateHash.then(function(newHash){
                        if(newHash){
                            var updateData = {
                                password: newHash,
                                otp:otp
                            };
                            Main_User.update({email:req.body.email}, updateData)
                            .exec(function(err){
                                if(err) return res.status(400).send({success:false,msg:'Unable To Register'})
                                var genratedToken = TokenHelper.generateUserToken( "data.email",data.email);
                                var newToken = {
                                    email: req.body.email,
                                    verified: false,
                                    token: genratedToken,
                                    expiration_time: moment().day(30),
                                    updated_date: new Date()
                                };
                                var addToken = new Main_User_Token(newToken);
                                addToken.save(function(err) {
                                    if (err) {
                                        return res.json({success: false, msg: 'Token Already Exists'});
                                    }
                                    mailer.participantRegister({
                                        name:data.name,
                                        email:data.email,
                                        otp:otp
                                    });
                                    res.json({success:true, token:genratedToken, msg:'Successfully Registered!!'});
                                });
                            });
                        }
                    });
                });
        }
    }
};

exports.verifyOTP = function (req, res) {
    if (req.locals.email && req.body.otp) {
        Main_User.findOne({
            email: req.locals.email
        })
            .select('email verified otp referred_by thomso_id primary_event')
            .exec(function (err, user) {
                if (err) res.json({ success: false, msg: 'Error' });
                if (!user) res.json({ success: false, msg: 'User not found' });
                else {
                    if (user.verified) {
                        res.json({ success: true, msg: 'Email is Already Verified', already: true });
                    } else {
                        if (req.body.otp === user.otp) {
                            if (user.thomso_id) {
                                Counter.findByIdAndUpdate({ _id: 'participant_id' }, { $inc: { seq: 1 } }, { upsert: true, new: true }, function (error, cnt) {
                                    if (error) {
                                        return res.status(400).send({ success: false, msg: 'Unable Create ID' });
                                    }
                                    var newOtp = Generator.generateOTP();
                                    var thomso_id = "TH" + (1800000 + cnt.seq);
                                    var updateData = {
                                        otp: newOtp,
                                        verified: true,
                                        referred_by: user.referred_by,
                                        thomso_id: thomso_id
                                    };
                                    Main_User_Token.update({ email: req.locals.email }, { verified: true }, { multi: true })
                                        .exec(function (err) {
                                            if (err) {
                                                // console.log(err)
                                            }
                                        })
                                    Main_User.findOneAndUpdate({ email: req.locals.email }, updateData)
                                        .populate('primary_event', 'name')
                                        .select(requiredVars)
                                        .exec(function (err, parti) {
                                            if (err)  return res.json({ success: false, msg: 'Unable to Verify' });
                                            if (user.referred_by) {
                                                Temp_User.update({ ca_id: user.referred_by }, { $inc: { referrals: 1 } }, function (error) {
                                                    if (error)  return res.json({ success: false, msg: 'Unable To Add Referrals' });
                                                    EventSchema.update(
                                                        {event_id:user.primary_event},
                                                        {$addToSet:{users:req.locals._id}}
                                                    )
                                                    .exec(function(err){
                                                        if (err)  return res.json({ success: false, msg: 'Unable To Add Event' });
                                                        res.json({ success: true, body: parti, msg: 'Successfully verified' });
                                                    })
                                                })
                                            } else  res.json({ success: true, body: parti, msg: 'Successfully verified' });

                                            mailer.participantVerified({
                                                name: parti.name,
                                                email: parti.email
                                            });
                                        });
                                })
                            } else {
                                var newOtp = Generator.generateOTP();
                                var updateData = {
                                    otp: newOtp,
                                    verified: true,
                                };
                                Main_User_Token.update({ email: req.locals.email }, { verified: true }, { multi: true })
                                    .exec(function (err) {
                                        // if (err)  console.log(err)
                                    })
                                Main_User.findOneAndUpdate({ email: req.locals.email }, updateData)
                                    .populate('primary_event', 'name')
                                    .select(requiredVars)
                                    .exec(function (err, parti) {
                                        if (err) return res.json({ success: false, msg: 'Unable to Verify' });

                                        res.json({ success: true, body: parti, msg: 'Successfully verified' });
                                        // mailer.participantVerified({
                                        //     name: parti.name,
                                        //     email: parti.email
                                        // });
                                    });
                            }
                        } else  return res.json({ success: false, msg: 'Incorrect OTP' })
                    }
                }
            });
    }  else res.status(400).send({ success: false, msg: 'Invalid Data' });
}

exports.participant_login = function(req, res) {
    if (req.body) {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.email && req.body.password) {
            Main_User.findOne({
                email: req.body.email
            })
                .populate('primary_event', 'name')
                .select('password ' + requiredVars)
                .exec(function (err, user) {
                    if (err) return res.status(400).send({ success: false, msg: 'Authentication failed. Error.' });
                    if (!user) {
                        return res.status(400).send({ success: false, msg: 'Authentication failed. User not found.', notExists: true });
                    } else {
                        user.comparePassword(req.body.password, function (err, isMatch) {
                            if (isMatch && !err) {
                                Main_User_Token.find({ email: req.body.email }).sort({ 'updated_date': 1 }).exec(function (err, tokens) {
                                    if (err) {
                                        return res.status(400).send({ success: false, msg: 'Unable To find token' });
                                    } else {
                                        var genratedToken = TokenHelper.generateUserToken(req.body.email, user._id);
                                        var newToken = {
                                            email: req.body.email,
                                            user_id: user._id,
                                            verified: user.verified,
                                            token: genratedToken,
                                            expiration_time: moment().day(30),
                                            updated_date: new Date()
                                        };
                                        var body = {
                                            _id: user._id,
                                            email: user.email,
                                            verified: user.verified,
                                            name: user.name,
                                            gender: user.gender,
                                            thomso_id: user.thomso_id,
                                            college: user.college,
                                            address: user.address,
                                            contact: user.contact,
                                            primary_event: user.primary_event
                                        }
                                        if (tokens.length > 2 && tokens[0]) {
                                            Main_User_Token.update({ _id: tokens[0]._id }, newToken)
                                                .exec(function (err) {
                                                    if (err) return res.status(400).send({ success: false, msg: 'Unable Create Token' });

                                                    if (user.verified) return res.json({ success: true, token: genratedToken, msg: 'Successfully Authenticated', body: body });
                                                     else  return res.json({ success: true, token: genratedToken, msg: 'Successfully Authenticated'})
                                                });
                                        } 
                                        else {
                                            var addToken = new Main_User_Token(newToken);
                                            addToken.save(function (err) {
                                                // console.log(err);
                                                if (err) return res.status(400).send({ success: false, msg: 'Token Already Exists' });
                                                
                                                if (user.verified)  return res.json({ success: true, token: genratedToken, msg: 'Successfully Authenticated', body: body });
                                                else return res.json({ success: true, token: genratedToken, msg: 'Successfully Authenticated'})
                                            });
                                        }
                                    }
                                });
                            } else  res.json({ success: false, msg: 'Authentication failed. Wrong password.', mismatch: true });
                        });
                    }
                });
        } else  res.status(400).send({ success: false, msg: 'Invalid Data' });
    } else  res.status(400).send({ success: false, msg: 'Invalid Data' });
};

exports.reset_password = function(req, res){
    if(req && req.body && req.body.email && req.body.tempPassword && req.body.password){
        // console.log(req.body)
        Main_User.findOne({email:req.body.email})
            .select('tempPassword')
            .exec(function(err, result){
                if(err) return res.status(406).send({success:false, msg:'Authentication Failed'})
                if(!result) return res.json({success:false, msg:"Email Doesn't Exist"})
                else{
                    result.compareTempPassword(req.body.tempPassword, function(err, flag){
                        if(flag && !err){
                            var generateNewHash = Generator.generateHash(req.body.password);
                            generateNewHash.then(function(newHash){
                                if(newHash){
                                    var updateData = {
                                        tempPassword:"",
                                        password:newHash
                                    };
                                    Main_User.update(
                                        {email:req.body.email},
                                        updateData
                                    )
                                    .exec(function(err){
                                        if(err) return status(401).send({success:false, msg:"Unable To Update Password. Please Try Again."})
                                        res.json({success:true, msg:"Password Successfully Changed."})
                                    })
                                } else return status(401).send({success:false, msg:"Unable To create hash"})
                            })
                        }
                        else if(err) return res.json({success:false, msg:"Something went wrong"})
                        else return res.json({success:false, msg:"Wrong Password"})
                    })
                }
            })
    } else return res.status(400).send({success:false, msg:'Invalid Data'});
}

exports.reset_password_email = function(req, res){
    if(req && req.body && req.body.email){
        // console.log(req.body)
        // req.body.email = req.body.email.trim();
        // var newPass = Generator.generatePassword(20);
        var newPass = "prash";
        if (newPass) {
            var generateHash = Generator.generateHash(newPass);
            generateHash.then(
                function(newHash) {
                    if (newHash) {
                        var updateData = {
                            tempPassword: newHash
                        };
                        if(updateData.tempPassword){
                            Main_User.findOneAndUpdate({email:req.body.email}, updateData)
                            .select('name email')
                            .exec( function(err,result){
                                if(err) {return res.state(400).send({ success: false, msg:"Something Went Wrong"})}
                                if(!result) {return res.json({ success: false, msg:"Email Doesn't exist"})}
                                else{
                                    // console.log(result)
                                    mailer.participantResetPassword({
                                        name:result.name,
                                        email:result.email,
                                        password:newPass
                                    });
                                    res.json({status:200, success:true, body:result, msg:'Email sent'})
                                }
                            })
                        }else return res.json({success:false, msg:'Something went wrong'});   
                    }
                    else res.status(400).send({success:false, msg:'Unable To create hash'});   
                })
        }
    } else  res.status(400).send({success:false, msg:'Invalid Data'});
}