var request = require('request');
var Main_User = require('../../../models/main/Main_User');
var Event_Schema = require('../../../models/main/Events_Schema');


exports.addEvent = function(req, res) {
   if(req && req.body){
       if(req.body.event_id)req.body.event_id = req.body.event_id.trim();
       if(req.body.name)req.body.name = req.body.name.trim();

       var data = {
           event_id : req.body.event_id,
           name : req.data.name
       }
       if(data.event_id && data.name){
           var newEvent = new Event_Schema(data);
           newEvent.save(function(err){
               if(err)
                    res.json({success:false, msg:'unable to add event'});
                res.jso({success:true, msg:'event added'});
           })
       }
   }
};

exports.removeEvent = function(req, res) {
    if(req && req.body){
        if(req.body.event_id)req.body.event_id = req.body.event_id.trim();
 
        var data = {
            event_id : req.body.event_id,
        }
        if(data.event_id){
            Event_Schema.remove({event_id:data.event_id})
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

exports.addParticipant = function(req, res){
    if(req && req.body){
        if(req.body.event_id)req.body.event_id = req.body.event_id.trim();
        if(req.body.thomso_id)req.body.thomso_id = req.body.thomso_id.trim();
 
        var data = {
            event_id : req.body.event_id,
            thomso_id : req.data.thomso_id
        }
        if(data.event_id && data.thomso_id){
            Event_Schema.findOneAndUpdate(
                {event_id:data.event_id},
                {$addToSet:{users:data.thomso_id}}
            )
            .exec(function(err){
                if(err)
                    res.json({success:false, msg:'unable to add participant'});
                Main_User.findOneAndUpdate(
                    {thomso_id:data.thomso_id},
                    {$addToSet:{event:data.event_id}}
                ) 
                .exec(function(err){
                    if(err)
                        return res.json({success:false, msg:'unable to add event'});
                    res.json({success:true, msg:'event added in participant'});
                });            
            });
        }
        else
            return res.status(400).send({success:false,msg:'Somethinf went wrong'});
    }
}

exports.removeParticipant = function(req, res){
    if(req && req.body){
        if(req.body.event_id)req.body.event_id = req.body.event_id.trim();
        if(req.body.thomso_id)req.body.thomso_id = req.body.thomso_id.trim();
 
        var data = {
            event_id : req.body.event_id,
            thomso_id : req.data.thomso_id
        }
        if(data.event_id && data.thomso_id){
            Event_Schema.findOneAndUpdate(
                {event_id:data.event_id},
                {$pull:{users:data.thomso_id}}
            )
            .exec(function(err){
                if(err)
                    res.json({success:false, msg:'unable to remove participant'});
                Main_User.findOneAndUpdate(
                    {thomso_id:data.thomso_id},
                    {$pull:{event:data.event_id}}
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