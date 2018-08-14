var Zonal_User = require('../../../../models/zonals/Zonals_Registration');

/* GET All Users */
exports.getDelhiUsers = function(req, res) {
    Zonal_User.find({city: 'Delhi'})
    .select('name college email branch contact events city create_date')
    .exec(function (err, allUsers) {
        if (err) return res.status(400).send({success:false, msg:'Unable to GET Participants', error:err});
        res.json(allUsers);
    });
};

exports.getJaipurUsers = function(req, res) {
    Zonal_User.find({city: 'Jaipur'})
    .select('name college email branch contact events city create_date')
    .exec(function (err, allUsers) {
        if (err) return res.status(400).send({success:false, msg:'Unable to GET Participants', error:err});
        res.json(allUsers);
    });
};

exports.getLucknowUsers = function(req, res) {
    Zonal_User.find({city: 'Lucknow'})
    .select('name college email branch contact events city create_date')
    .exec(function (err, allUsers) {
        if (err) return res.status(400).send({success:false, msg:'Unable to GET Participants', error:err});
        res.json(allUsers);
    });
};
