var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fb_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    ca_id: {
        type: String
    },
    contact: {
        type: String
    },
    state : {
        type: String
    },
    branch: {
        type: String
    },
    address : {
        type: String
    },
    why: {
        type: String
    },
    created: {
        type: Boolean,
        default: false
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('FB_User', UserSchema);