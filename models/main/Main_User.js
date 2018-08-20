var mongoose = require('mongoose');
var bcryt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    thomso_id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    college: {
        type:String,
        required: true,
    },
    state: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required:true
    },
    event:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event_Schema'
    }],
    verified: {
        type: Boolean,
        default:false
    },
    image:{
        type:String
    },
    password:{
        type:String,
        required: true
    },
    created_date:{
        type:Date,
        default:Date.now
    },
    state:{
        type:String
    },
    branch:{
        type:String,
        required:true
    },
    referred_by:{
        type:String
    },
    otp:{
        type:String
    }
});

UserSchema.methods.comparePassword = function(pass, callback){
    bcryt.compare(pass,this.password, function(err, isMatch){
        if(err)
            return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Main_User',UserSchema);