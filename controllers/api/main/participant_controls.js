var Main_User = require('../../../models/main/Main_User');

exports.userInfo = function(req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
    .populate('event', 'name event_id')
    .select('name email gender thomso_id college contact verified')
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
        } 
        // else if(!user.verified){
        //     return res.status(400).send({success: false, msg: 'User not verified'});
        // }
        else {
            res.json({success: true, isVerified:true, msg:'User Data Found', body:user});
        }
    });
};
