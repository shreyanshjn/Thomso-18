var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    event_id:{
        type:String,
        unique:true,
        required:true,

    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    users : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Main_User'    
    }],
    member:{
        type:String
    }
});

module.exports = mongoose.model('Events_Schema',UserSchema);