var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    coordinator_email: {
        type: String,
        required: true
    },
    thomso_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    ifsc_code: {
        type: String,
        required: true
    },
    account_no: {
        type: String,
        required: true
    },
    bank_name: {
        type: String,
        required: true
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