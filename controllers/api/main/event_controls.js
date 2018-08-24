var Main_User = require('../../../models/main/Main_User');
var EventSchema = require('../../../models/main/Thomso_Event');

exports.addEvent = function(req, res) {
    if(req && req.body){
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
            var newEvent = new EventSchema(data);
            newEvent.save(function(err){
                if(err) {
                    return res.json({success:false, msg:'Unable to add event'})
                };
                res.json({success:true, msg:'Event added'});
            })
        }
    }
};

exports.getEvents = function(req, res) {
    EventSchema.find({isPrimary: true})
        .select('name')
        .exec(function(err, result){
            if(err) {
                return res.json({success:false, msg:'Unable to fetch event'});
            }
            res.json({success:true, msg:'event fetched', body: result});
        });
};

exports.removeEvent = function(req, res) {
    if(req && req.body){
        if(req.body.event_id) req.body.event_id = req.body.event_id.trim();
 
        if(req.body.event_id){
            EventSchema.remove({event_id:req.body.event_id})
            .exec(function(err){
                if(err)
                    res.json({success:false, msg:'unable to delete event'});
                res.json({success:true, msg:'event deleted'});
            });
        }
        else
            return res.status(400).send({success:false,msg:'Something went wrong'});
    }
};

exports.fetchEvent = function(req, res) {
        EventSchema.find()
        .select('event_id name')
        .exec(function(err, result){
            if(err)
                res.json({success:false, msg:'unable to fetch event'});
            res.json({success:true, msg:'event fetched', event : result});
        });
};


exports.addParticipant = function(req, res){
    if(req && req.body){
        var updateData = {
            event_id : req.body.event_id,
            email: req.locals.email
        };
        if (updateData.event_id) {
            EventSchema.findOneAndUpdate(
                {event_id:req.body.event_id},
                {$addToSet:{users:req.locals._id}}
            )
            .exec(function(err, result){
                if(err){
                    return res.status(400).send({success:false, msg:'Unable to add participant'}); 
                }
                if (result) {
                    Main_User.update(
                        {email:updateData.email},
                        {$addToSet:{event:result._id}}
                    )
                    .exec(function(err){
                        if(err){
                            return res.status(400).send({success:false, msg:'Unable to add event'});
                        }
                        res.json({success:true, msg:'Event added in participant'});
                    });
                } else {
                    return res.status(400).send({success:false,msg:'No such event Exists'});
                }
            });
        } else {
            return res.status(400).send({success:false,msg:'Event ID Not Found'});
        }
    } else {
        return res.status(400).send({success:false,msg:'Invalid Data'});
    }
}

exports.removeParticipant = function(req, res){
    if(req && req.body){
        // console.log(req.body)
        // console.log(req.locals)
        var data = {
            event_id : req.body.event_id,
            email : req.locals.email,
            _id:req.locals._id
        }
        if(data.event_id && data.email && data._id){
            EventSchema.findOneAndUpdate({ event_id: data.event_id }, {$pull:{users:data._id}})
            .select('name')
            .exec(function(err, user){
                if(err){
                    // console.log(err)
                    return res.state(400).send({success:false, msg:'unable to remove participant'});}
                    // console.log(user)
                Main_User.findOneAndUpdate(
                    {email:data.email},
                    {$pull:{event:user._id}}
                ) 
                .exec(function(err){
                    if(err)
                        return res.json({success:false, msg:'unable to remove event'});
                    res.json({success:true, msg:'event removes from participant'});
                });            
            });
        }
        else
            return res.status(400).send({success:false,msg:'Something went wrong'});
    }
}