var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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