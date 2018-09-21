var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    coordinator_name: {
        type: String,
        required: true
    },
    thomso_id: {
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
        default:Date.now
    },
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
module.exports = mongoose.model('Winner_List', UserSchema);