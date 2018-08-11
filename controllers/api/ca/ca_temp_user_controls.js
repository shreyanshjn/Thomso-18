var Temp_User = require('../../../models/ca/CA_Temp_User');

// Get User Data
exports.getData = function(req, res) {
    Temp_User.findOne({
        email: req.locals.email
    })
    .select('name email gender verified')
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
