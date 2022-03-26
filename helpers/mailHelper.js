const nodemailer = require('nodemailer')

const sendMail = (to_mail, subject, mail_body, attachments) => {

    return new Promise(async (resolve, reject) => {

        try {

            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", //'smtp.gmail.com',
                port: 587, //465
                secure: false, // secure:true for port 465, secure:false for port 587
                auth: {
                    // user: process.env.FROM, //"kshitij@aiolos.solutions",
                    // pass: process.env.PASSWORD
                    user: process.env.EMAIL_ID,
                    pass: process.env.PASSWORD
                }
            });

            /*  transporter.verify(function (error, success) {
                 if (error) {
                     logger.error('Tranportar Verify Err:', error)
                 } else {
                     // console.log("Server is ready to take our messages");
                 }
             }); */

            var mailOptions = {
                from: ``, // sender address (who sends)
                to: to_mail, // list of receivers (who receives)
                // cc: process.env.CC,
                subject: subject, // Subject line
                text: '', // plaintext body
                html: mail_body, // html body
                attachments
            }

            transporter.sendMail(mailOptions, function (error, info) {

                if (error) {
                    reject(error)
                }
                let sendMailResponse = info && info.response ? info.response : 'Send Mail Error'
                resolve(sendMailResponse);
            })

        } catch (err) {
            // logger.error('sendMail Catch Err:', err)
            reject(err)
        }
    });

}

module.exports = { sendMail }