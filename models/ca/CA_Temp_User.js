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
    password: {
        type: String
    },
    temp_password: {
        type: String
    },
    verified: {
        type: Boolean
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

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.methods.compareTempPassword = function (passw, cb) {
    bcrypt.compare(passw, this.temp_password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('CA_Temp_User', UserSchema);