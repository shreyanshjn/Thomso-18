var Main_User = require('../../../models/main/Main_User');
var MUN_Answer = require('../../../models/mun/MUN_Answer');

var mailer = require('../../common/mailer');

exports.userInfo = function (req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
        .populate('primary_event', 'name')
        .select('name email gender thomso_id college address contact verified primary_event image')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: 'Unable to connect to database. Please try again.',
                    error: err
                })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            } else if (!user.verified){
                return res.json({ success: true, isVerified: false, msg: 'User Data Found', body: {email: user.email, name: user.name} });
            } else {
                return res.json({ success: true, isVerified: true, msg: 'User Data Found', body: user });
            }
        });
};

exports.get_image = function (req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
        .select('verified image')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: 'Unable to connect to database. Please try again.',
                    error: err
                })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            } else if (!user.verified){
                return res.json({ success: true, isVerified: false, msg: 'User Data Found', body: {email: user.email, name: user.name} });
            } else {
                return res.json({ success: true, isVerified: true, msg: 'User Data Found', body: user });
            }
        });
};

exports.getUserEvents = function (req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
        .populate('event', 'name event_id')
        .select('primary_event')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            } else {
                res.json({ success: true, msg: 'Events List', body: user });
            }
        });
};

exports.update_image = function (req, res) {
    if(req && req.body && req.body.format){
        let data = {
            id:req.locals._id,
            email:req.locals.email,
            img:req.body.image,
            format:req.body.format
        }
        let baseImg = data.img.split(',')[1]
        let binaryData = new Buffer(baseImg, 'base64');
        let ext = data.format.split('/')[1]
        let updateData = {image : `${data.id}.${ext}`}
        const url = `/uploads/img/ProfileImage/${updateData.image}`;
        require("fs").writeFile(`./uploads/img/ProfileImage/${updateData.image}`, binaryData, function(err) {
            if(err) {
                console.log(err);
                return res.status(400).send({ success: false, msg:"something went wrong"});
            } else {
                Main_User.findOneAndUpdate({
                    email:data.email
                }, updateData)
                .exec(function(err){
                    if (err) return res.status(400).send({ success: false, msg: "Unable To Upload Image. Please Try Again." })
                    res.json({ success: true, body:url, msg: "Image Uploaded Successfully." })
                })
            }
        })
    }else res.status(400).send({ success: false, msg: 'Invalid Data' });
}

exports.resendOTP = function (req, res) {
    if (req.locals.email) {
        Main_User.findOne({
            email: req.locals.email
        })
            .select('name email otp')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'User not found' });
                } else {
                    mailer.participantRegister({
                        name: user.name,
                        email: user.email,
                        otp: user.otp
                    });
                    res.json({ success: true, msg: 'Successfully sent email', body: user.email });
                }
            });
    } else {
        res.status(400).send({ success: false, msg: 'User Not Found' });
    }
};

exports.munAnswer = function (req, res) {
    if (req.locals._id && req.body.answerOne && req.body.answerTwo && req.body.answerThree) {
        var data = {
            answerOne: req.body.answerOne,
            answerTwo: req.body.answerTwo,
            answerThree: req.body.answerThree,
            user: req.locals._id
        }
        var newAnswer = MUN_Answer(data);
        newAnswer.save(function (err, answer) {
            if (err) {
                return res.json({success: false, msg: 'Error'});
            } else if (!answer) {
                return res.json({success: false, msg: 'Unable to save'});
            } else {
                Main_User.findOneAndUpdate({
                    _id:req.locals._id
                }, {
                    mun: answer._id,
                    $addToSet: { event: "5b8456af1715f612ef4192c4" }
                }).exec(function(err){
                    if (err) return status(400).send({ success: false, msg: "Unable to add answer" });
                    res.json({ success: true, msg: "Answer added successfully" });
                })
            }
        });
    } else {
        res.status(400).send({ success: false, msg: 'User Not Found' });
    }
};
