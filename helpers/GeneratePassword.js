var bcrypt = require('bcrypt-nodejs');

exports.generatePassword = function(length) {
    if(typeof(length) === "number") {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    } else {
        return false
    }
}

exports.generateHash = function(password) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            console.log(err);
            return false;
        }
        bcrypt.hash(password, salt, null, function (err, hash) {
            if (err) {
                console.log(err);
                return false;
            }
            return hash;
        });
    });
}
