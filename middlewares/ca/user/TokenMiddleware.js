var moment = require('moment');

var CA_User_Token = require("../../../models/ca/CA_User_Token");

exports.verify = (req, res, next) => {
    var authHeader = req.get('Authorization')
    if (authHeader !== undefined) {
        // Find token in db
        CA_User_Token.findOne({
            token: authHeader
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.status(403).send({success: false, msg: 'Invalid Token'});
            } else if (moment() > user.expirationTime) {
                // If token expired
                res.status(403).json({ success: false, message: 'Token Expired' });
            } else {
                res.locals.fb_id = user.fb_id;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Token Not Found' })
    }
}
