var nodemailer = require('nodemailer');

var caMailer = function(user) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: 'thomso.mailer@gmail.com',
            pass: 'nikhil@9116891112'
        }
    });

    var mailOptions = {
        from: 'thomso.mailer@gmail.com',
        to: user.email,
        subject: 'Thomso Campus Ambassador',
        html: '<b>Hello world</b>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        transporter.close();
    });
};

exports.caMailer = caMailer;