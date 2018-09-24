var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    answerOne:{
        type:String,
        required:true,
    },
    answerTwo:{
        type:String,
        required:true
    },
    answerThree: {
        type:String,
        required:true
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Main_User'    
    }
});

module.exports = mongoose.model('MUN_User',UserSchema);