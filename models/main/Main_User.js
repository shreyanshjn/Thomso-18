var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    thomso_id: {
        type: String
    },
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
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events_Schema'
    }],
    primary_event: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String
    },
    branch: {
        type: String,
        required: true
    },
    referred_by: {
        type: String
    },
    otp: {
        type: String
    }
});
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (pass, callback) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if (err)
            return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Main_User', UserSchema);