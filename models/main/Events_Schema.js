var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    event_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    users : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Main_User'    
    }],
    member:{
        type:String
    }
});

module.exports = mongoose.model('Event_Schema',UserSchema);