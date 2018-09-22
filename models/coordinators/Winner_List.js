var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    coordinator_email: {
        type: String,
        unique:false
    },
    thomso_id: {
        type: String,
        unique:false

    },
    name: {
        type: String,
        unique:false
    },
    college: {
        type: String,
        unique:false
    },
    email: {
        type: String,
        unique:false
    },
    contact: {
        type: String,
        unique:false
    },
    event_name: {
        type: String,
        unique:false
    },
    position: {
        type: String,
        unique:false
    },
    event_name_email: {
        type: String,
        unique:true
    },
    ifsc_code: {
        type: String,
        unique:false
    },
    account_no: {
        type: String,
        unique:false
    },
    bank_name: {
        type: String,
        unique:false
    },
    verified:{
        type:Boolean,
        default:true
    },
    created_date:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model('Winner_List', UserSchema);