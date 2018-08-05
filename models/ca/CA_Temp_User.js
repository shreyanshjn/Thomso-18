var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    why: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CA_Temp_User', UserSchema);