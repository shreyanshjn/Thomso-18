var nodemailer = require('nodemailer');

var caMailer = function(user) {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            type: "OAuth2",
            user: "thomso.mailer@gmail.com",
            clientId: "36396493886-tuf1p19t65v7dd7uquh40v87cv80dgrn.apps.googleusercontent.com",
            clientSecret: "5T3VJa4gEYVzkVfJ3UI3Tzud",
            refreshToken: "1/Fom62jgBRyBZqXDLCRyKYunjs54OetXB0gZtuhfc0ZQ"
        }
    });
    var mailOptions = {
        from: "thomso.mailer@gmail.com",
        to: "nikhilmehra998@gmail.com",
        subject: "Thomso Campus Ambassador",
        html: "<b>Congragulations. You've successfully registered as Campus Ambassador for Thomso'18.</b>"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log(info)
        }
        transporter.close();
    });
};

var caTempMailer = function(user) {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            type: "OAuth2",
            user: "thomso.mailer@gmail.com",
            clientId: "36396493886-tuf1p19t65v7dd7uquh40v87cv80dgrn.apps.googleusercontent.com",
            clientSecret: "5T3VJa4gEYVzkVfJ3UI3Tzud",
            refreshToken: "1/Fom62jgBRyBZqXDLCRyKYunjs54OetXB0gZtuhfc0ZQ"
        }
    });
    var mailOptions = {
        from: "thomso.mailer@gmail.com",
        to: "nikhilmehra998@gmail.com",
        subject: "Thomso Campus Ambassador",
        html: "<b>Congragulations. You've successfully registered as Campus Ambassador for Thomso'18.</b>"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log(info)
        }
        transporter.close();
    });
};

exports.caMailer = caMailer;