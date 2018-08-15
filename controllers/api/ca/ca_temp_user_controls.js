var request = require('request');
var Temp_User = require('../../../models/ca/CA_Temp_User');

// Get User Data
exports.getData = function(req, res) {
    Temp_User.findOne({
        email: req.locals.email
    })
    .select('name email gender verified ca_id')
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