var request = require('request');
var Main_User = require('../../../models/main/Main_User');

exports.userInfo = function(req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
    .select('name email gender thomso_id college contact')
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
