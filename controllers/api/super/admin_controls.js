var Participant = require("../../../models/main/Main_User");
var ParticipantToken = require("../../../models/main/Main_User_Token");

exports.getParticipant = function(req, res) {
    if (req.params.id) {
        console.log(req.params.id);
        Participant.findOne({_id: req.params.id})
            .select('image thomso_id name email gender contact college state address verified blocked payment_type accomodation password branch')
            .populate('event', 'name')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'User not found' });
                }
                res.json({ success: true, msg: 'Participant Data', body: user });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.getParticipantToken = function(req, res) {
    if (req.params.id) {
        ParticipantToken.findOne({user_id: req.params.id})
            .select('token')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                }
                if (user && user.token) {
                    return res.json({ success: true, msg: 'Token', token: user.token });
                } else {
                    return res.status(400).send({ success: false, msg: 'Token not found' });
                }
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
}

exports.patchParticipantData = function(req, res) {
    if (req.params.id) {
        if (req.body) {
            var updateData = {};
            if (req.body.thomso_id) {
                updateData.thomso_id = req.body.thomso_id;
            }
            if (req.body.name) {
                updateData.name = req.body.name;
            }
            if (req.body.email) {
                updateData.email = req.body.email;
            }
            if (req.body.gender) {
                updateData.gender = req.body.gender;
            }
            if (req.body.contact) {
                updateData.contact = req.body.contact;
            }
            if (req.body.college) {
                updateData.college = req.body.college;
            }
            if (req.body.state) {
                updateData.state = req.body.state;
            }
            if (req.body.address) {
                updateData.address = req.body.address;
            }
            if (req.body.verified !== undefined) {
                updateData.verified = req.body.verified
            }
            if (req.body.blocked !== undefined) {
                updateData.blocked = req.body.blocked
            }
            if (req.body.payment_type !== undefined && !isNaN(parseInt(req.body.payment_type))) {
                updateData.payment_type = parseInt(req.body.payment_type)
            }
            if (req.body.accomodation) {
                updateData.accomodation = req.body.accomodation;
            }
            if (req.body.password) {
                updateData.password = req.body.password;
            }
            if (req.body.branch) {
                updateData.branch = req.body.branch;
            }
            console.log(updateData)
            if (updateData) {
                Participant.findByIdAndUpdate(req.params.id, updateData, {new: true})
                    .select('image thomso_id name email gender contact college state address verified blocked payment_type accomodation password branch')
                    .exec(function (err, user) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                        }
                        if (!user) {
                            return res.status(400).send({ success: false, msg: 'User not found' });
                        }
                        return res.json({ success: true, msg: 'Updated Data', body: user });
                    });
            } else {
                return res.status(400).send({ success: false, msg: 'Empty Data' });
            }
        } else {
            return res.status(400).send({ success: false, msg: 'Empty Data' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid User' });
    }
}
