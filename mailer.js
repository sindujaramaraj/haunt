var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "hauntmailer@gmail.com",
        pass: "xxxxx"
    }
});

var mail = {
    from: "Haunt Mailer <hauntmailer@gmail.com>",
    to: null,
    subject: "Haunt Website Updates",
    text: null,
    html: null
};

function sendMail(to, text) {
	mail.to = to;
	mail.text = text;
	smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });
}

module.exports.sendMail = sendMail;
