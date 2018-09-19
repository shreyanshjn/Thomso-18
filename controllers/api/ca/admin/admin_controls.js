var Users = require('../../../../models/ca/CA_User');
var Ideas = require('../../../../models/ca/CA_Idea');

var TempUsers = require('../../../../models/ca/CA_Temp_User');
var TempIdeas = require('../../../../models/ca/CA_Temp_Idea');

// const fs = require('fs');
// const moment = require('moment');
// const json2csv = require('json2csv').parse;
// const path = require('path')
// // const fields = ['name'];
// const mongotocsv = require('mongo-to-csv');
// var csv = require('csv');


/* GET ALL Users */
exports.getParticipant = function (req, res) {
    Users.find({ created: true })
        .select('ca_id name gender image email referrals contact branch college state address why link blocked')
        .exec(function (err, allUsers) {
            if (err) return res.status(400).send({ success: false, msg: 'Unable to GET Participants', error: err });
            res.json(allUsers);
        });
};

/* GET ALL Users */
exports.getScoreList = function (req, res) {
    Users.find({ created: true })
        .select('ca_id name gender likes shares score ideas bonus referrals blocked')
        .exec(function (err, allUsers) {
            if (err) return res.status(400).send({ success: false, msg: 'Unable to GET Score', error: err });
            res.json(allUsers);
        });
};

/* Read All Ideas */
exports.getIdeas = function (req, res) {
    Ideas.find()
        .populate('user', 'name image ca_id')
        .select('title body comment deleted updated_date')
        .sort({ 'updated_date': -1 })
        .exec(function (err, allIdeas) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Cannot GET Ideas', error: err });
            }
            res.json(allIdeas);
        })
};

/* Update Idea */
exports.putIdea = function (req, res) {
    if (req.params.id) {
        var updateData = {
            comment: req.body.comment
        }
        Ideas.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true })
            .exec(function (err, idea) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Update Idea', error: err });
                }
                return res.json({ success: true, msg: 'Successfully Updated', body: idea });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* Delete Idea */
exports.deleteIdea = function (req, res) {
    if (req.params.id) {
        var updateData = {
            deleted: req.body.deleted
        }
        Ideas.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true })
            .select('deleted')
            .exec(function (err, idea) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Switch Delete', error: err });
                }
                return res.json({ success: true, msg: 'Delete Switch Success', body: idea });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* Block User */
exports.blockUser = function (req, res) {
    if (req.params.id && req.body.blocked !== undefined) {
        var updateData = {
            blocked: req.body.blocked
        };
        Users.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true })
            .select('blocked')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Failed to switch block', error: err });
                }
                return res.json({ success: true, msg: 'Successfully Updated', body: user });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'No User ID Specified' });
    }
};

/* Update Bonus */
exports.putBonus = function (req, res) {
    if (req.body.id && req.body.bonus !== undefined) {
        var updateData = {
            bonus: req.body.bonus
        }
        Users.findOneAndUpdate({ _id: req.body.id }, updateData, { new: true })
            .select('bonus')
            .exec(function (err, bonus) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Update bonus', error: err });
                }
                return res.json({ success: true, msg: 'Successfully Updated', body: bonus });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

/* GET All Temp Users */
exports.getTempUsers = function (req, res) {
    TempUsers.find()
        .select('name email ca_id verified gender contact college state branch address why create_date')
        .exec(function (err, allUsers) {
            if (err) return res.status(400).send({ success: false, msg: 'Unable to GET Participants', error: err });
            res.json(allUsers);
        });
};

/* GET ALL Users */
exports.getTempScoreList = function (req, res) {
    TempUsers.find()
        .select('name ca_id gender college score ideas bonus referrals verified')
        .exec(function (err, allUsers) {
            if (err) return res.status(400).send({ success: false, msg: 'Unable to GET Score List', error: err });
            res.json(allUsers);
        });
};

/* Read All Ideas */
exports.getTempIdeas = function (req, res) {
    TempIdeas.find()
        .populate('user', 'name image ca_id')
        .select('title body comment deleted updated_date')
        .sort({ 'updated_date': -1 })
        .exec(function (err, allIdeas) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Cannot GET Ideas', error: err });
            }
            res.json(allIdeas);
        })
};

/* Update Idea */
exports.putTempIdea = function (req, res) {
    if (req.params.id) {
        var updateData = {
            comment: req.body.comment
        }
        TempIdeas.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true })
            .exec(function (err, idea) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Update Idea', error: err });
                }
                return res.json({ success: true, msg: 'Successfully Updated', body: idea });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* Delete Idea */
exports.deleteTempIdea = function (req, res) {
    if (req.params.id) {
        var updateData = {
            deleted: req.body.deleted
        }
        TempIdeas.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true })
            .select('deleted')
            .exec(function (err, idea) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Switch Delete', error: err });
                }
                return res.json({ success: true, msg: 'Delete Switch Success', body: idea });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* Unverify Temp User */
exports.unverifyTempUser = function (req, res) {
    if (req.params.id && req.body.verified !== undefined) {
        var updateData = {
            verified: req.body.verified
        };
        TempUsers.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true })
            .select('verified')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Failed to switch block', error: err });
                }
                return res.json({ success: true, msg: 'Successfully Updated', body: user });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'No User ID Specified' });
    }
};

/* Update Bonus */
exports.putTempBonus = function (req, res) {
    if (req.body.id && req.body.bonus !== undefined) {
        var updateBonus = {
            bonus: req.body.bonus
        }
        TempUsers.findOneAndUpdate({ _id: req.body.id }, updateBonus, { new: true })
            .select('bonus referrals')
            .exec(function (err, oldScore) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Update bonus', error: err });
                } else {
                    var score = 0;
                    if (typeof (oldScore.bonus) === "number") {
                        score = score + oldScore.bonus
                    }
                    if (typeof (oldScore.referrals) === "number") {
                        score = score + 23 * oldScore.referrals;
                    }
                    var updateScore = {
                        score: score
                    }
                    TempUsers.findOneAndUpdate({ _id: req.body.id }, updateScore, { new: true })
                        .select('bonus referrals score')
                        .exec(function (err, newScore) {
                            if (err) {
                                return res.status(400).send({ success: false, msg: 'Cannot Update Score', error: err });
                            }
                            return res.json({ success: true, msg: 'Successfully Updated', body: newScore });
                        });
                }
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};
