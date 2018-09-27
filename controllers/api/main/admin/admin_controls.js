var Main_User = require('../../../../models/main/Main_User');
var Thomso_Event = require('../../../../models/main/Thomso_Event');
var Associate_Sponsor = require('../../../../models/beta/Associate_Sponsor');

exports.userInfo = function(req,res){
    if(req.params && req.params.page){
        if (req.params.page === "all") {
            Main_User.find()
                    .select('name email gender thomso_id college address branch contact verified referral')
                    .populate('event', 'name')
                    .populate('primary_event', 'name')
                    .exec(function (err, user) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                        }
                        if (!user) {
                            return res.status(400).send({ success: false, msg: 'User not found' });
                        }
                        res.json({ success: true, msg: 'Events List', body: user });
                    });
        } else {
            var limit = 3;
            var skip = (parseInt(req.params.page) - 1)*limit;

            Main_User.count({}, function (err, count) {
                if (err) {
                    res.status(400).send({ success: false, msg: 'Rank Undefined', error: err });
                }
                var pages = Math.ceil(count/limit);
                Main_User.find()
                    .skip(skip)
                    .limit(limit)
                    .select('name email gender thomso_id college address branch contact verified referral')
                    .populate('event', 'name')
                    .populate('primary_event', 'name')
                    .exec(function (err, user) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                        }
                        if (!user) {
                            return res.status(400).send({ success: false, msg: 'User not found' });
                        }
                        res.json({ success: true, msg: 'Events List', body: user, pages: pages, limit: limit });
                    });
            })
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
}

exports.eventUser = function(req,res){
    console.log(req.body, req.body.event_id)
    if(req && req.body && req.body.event_id){
        Thomso_Event.findOne({event_id:req.body.event_id})
        .populate('users', 'name')
        .select('name')
        .exec(function(err, result){
            if(err) return res.status(400).send({success:false, msg:'Error'})
            if(result) res.json({success:true, body:result, msg:'Fetched'})
            else return res.status(400).send({success:false, msg:'Unable to fetch event info'})
        })
    }else return res.status(400).send({success:false, msg:"Insuffiecient Data"})
}


exports.addEvent = function(req, res) {
    if(req && req.body && req.body.name && req.body.event_id){
        if(req.body.event_id)req.body.event_id = req.body.event_id.trim();
        if(req.body.name)req.body.name = req.body.name.trim();
        var isPrimary = false;
        if(req.body.isPrimary) isPrimary = true;
        var data = {
            event_id :req.body.event_id,
            name : req.body.name,
            isPrimary: isPrimary
        }
        if(data.event_id && data.name){
            var newEvent = new Thomso_Event(data);
            newEvent.save(function(err){
                if(err) {
                    return res.status(400).send({success:false, msg:'Unable to add event'})
                };
                res.json({success:true, msg:'Event added'});
            })
        }
    }else return res.status(400).send({success:false, msg:"Insuffiecient Data"})
};

exports.fetchEvents = function(req, res) {
    if(req){
        Thomso_Event.find()
        .select('name event_id')
        .exec(function(err, result){
            if(err) return res.status(400).send({success:false, msg:'Unable to fetch event'});
            if(result) res.json({success:true, msg:'event fetched', body: result});
            else return res.status(400).send({success:false, msg:'Unable to fetch event'});
        });
    }
    else return res.status(400).send({success:false, msg:'Invalid Request'});
};

exports.associate_fetch = ( req, res) => {
    if(req){
        Associate_Sponsor.find()
        .select('name email contact sponsorType message')
        .exec(function(err, result){
            if(err) return res.status(400).send({success:false, msg:'Unable to fetch event'});
            if(result) res.json({success:true, msg:'Data fetched', body: result});
            else return res.status(400).send({success:false, msg:'Unable to fetch event'});
        });
    }
    else return res.status(400).send({success:false, msg:'Invalid Request'});
}