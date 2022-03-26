const mailHelper = require('../helpers/mailHelper')

module.exports = {

    async sendNotificationMail(name, contact, to_mail)  {
        try {
            let subject = "Student Registered"
            let mail_body = `<h1>chAMPian</h1>
            <p> Hello ${name.firstName}, <br/>Student Registered Successfully:<p>`

            let mail_response = await mailHelper.sendMail(to_mail, subject, mail_body, [])
            console.log("Mail sent");
        }
        catch (error) {
            console.log("Notification Mail Error", error);
        }

    }
    
}