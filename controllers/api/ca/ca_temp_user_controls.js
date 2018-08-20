var request = require('request');
var Temp_User = require('../../../models/ca/CA_Temp_User');

var Ideas = require('../../../models/ca/CA_Temp_Idea');

// Get User Data
exports.getData = function(req, res) {
    Temp_User.findOne({
        email: req.locals.email
    })
    .select('name email gender verified ca_id bonus referrals score')
    .exec(function(err, user) {
        if (err) {
            return res.status(400).send({
                success:false,
                msg: 'Unable to connect to database. Please try again.',
                error: err
            })
        }
        if (!user) {
            return res.status(400).send({success: false, msg: 'User not found'});
        } else {
            res.json({success: true, msg:'User Data Found', body:user});
        }
    });
};

/* GET all Posts */
exports.getPosts = function (req, res) {
    var fb_auth_token = process.env.FB_ACCESS_TOKEN;
    if (fb_auth_token) {
        request(`https://graph.facebook.com/v3.1/171774543014513?fields=posts.since(2018-07-30){created_time,id,full_picture,message,link}&access_token=${fb_auth_token}`, function (err, response, body) {
            if (err) return res.status(400).send({ success: false, msg: 'Facebook returend error.', error: err });
            if (response.statusCode) {
                return res.status(response.statusCode).send(body);
            }
            return res.status(400).send({ success: false, msg: 'Facebook didnt return status.' });
        })
    } else {
        res.status(400).send({ success: false, msg: 'Token Not Found' });
    }
};

/* Create Idea */
exports.postIdea = function (req, res) {
    if (req.body && req.body.title && req.body.body && req.locals._id) {
        var newData = {
            user: req.locals._id,
            email: req.locals.email,
            title: req.body.title,
            body: req.body.body
        }
        var newIdea = new Ideas(newData);
        newIdea.save(function (err, idea) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to Add Idea' });
            } else if (idea._id) {
                Temp_User.update({ _id: req.locals._id }, { $addToSet: {ideas: idea._id} })
                .exec(function (err) {
                    if (err) {
                        return res.status(400).send({ success: false, msg: 'Cannot Append Idea', error: err });
                    }
                    return res.json({ success: true, msg: 'Idea Successfully Posted', body: idea });
                })
            } else {
                return res.status(400).send({ success: false, msg: 'Idea ID Not Found', body: idea });
            }
        });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

/* Read All Ideas */
exports.getIdea = function (req, res) {
    Ideas.find({ email: req.locals.email, deleted: { $ne: true } })
        .select('title body comment updated_date')
        .sort({ 'updated_date': -1 })
        .exec(function (err, allIdeas) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Cannot GET Ideas', error: err });
            }
            res.json({ success: true, msg: 'Ideas', body: allIdeas });
        })
};

/* Update Idea */
exports.putIdea = function (req, res) {
    if (req.params.id) {
        if (req.body.title) {
            req.body.title = req.body.title.trim();
        }
        if (req.body.body) {
            req.body.body = req.body.body.trim();
        }
        var updateData = {
            title: req.body.title,
            body: req.body.body,
            updated_date: new Date()
        }
        if (req.body.title && req.body.body) {
            Ideas.findOneAndUpdate({ email: req.locals.email, _id: req.params.id }, updateData, { new: true })
                .select('title body comment')
                .exec(function (err, idea) {
                    if (err) {
                        return res.status(400).send({ success: false, msg: 'Cannot Update Idea', error: err });
                    }
                    return res.json({ success: true, msg: 'Successfully Updated', body: idea });
                })
        } else {
            return res.status(400).send({ success: false, msg: 'Invalid Data' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* Remove Idea */
exports.deleteIdea = function (req, res) {
    if (req.params.id) {
        var updateData = {
            deleted: true
        };
        Ideas.update({ email: req.locals.email, _id: req.params.id }, updateData)
            .exec(function (err) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Delete Idea', error: err });
                }
                return res.json({ success: true, msg: 'Successfully Deleted' });
            })
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* GET Leaderboard */
exports.getLeaderboard = function (req, res) {
    Temp_User.find({ blocked: { $ne: true } })
        .select('name college score')
        .sort({ 'score': -1 })
        .limit(10)
        .exec(function (err, allUsers) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Cannot GET Leaders', error: err });
            }
            res.json(allUsers);
        })
};

/* GET Rank */
exports.getRank = function (req, res) {
    Temp_User.findOne({
        email: req.locals.email,
        verified: true
    })
        .select('score')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: 'Cannot Find User' });
            var score = user.score;
            if (score !== undefined) {
                Temp_User.count({ "score": { "$gt": score } }, function (err, rank) {
                    if (err) {
                        res.status(400).send({ success: false, msg: 'Rank Undefined', error: err });
                    }
                    return res.json({ success: true, msg: 'Your CA Rank', rank: rank + 1 });
                })
            } else {
                return res.status(400).send({ success: false, msg: 'Error Reading Score' });
            }
        })
};