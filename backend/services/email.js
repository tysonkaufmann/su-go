const nodemailer = require('nodemailer')

class Email {
  constructor () {
    // create a transporter that sends emails
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  async send (emailAddress) {
    const verificationCode = Math.random().toString().slice(2, 8)
    // create the email body and subject
    const mailOptions = {
      from: process.env.EMAIL,
      to: emailAddress,
      subject: 'Password Reset Request!',
      html: '<div style="text-align: -webkit-center;"><img src="https://cdn.discordapp.com/attachments/801163237768298496/808267396116774923/logo.jpg" alt="sugoLogo"><h1 style="color:#29d0e5;">RESET PASSWORD<h2><p style="color: orangered;">Your Su;Go password verification code is: <strong>' + verificationCode + '</strong></p><p>Please ignore this email if you did not make a password reset request!</p><p>Thanks<br>Su;Go Team</p></div>'
    }
    // send the email
    const info = await this.transporter.sendMail(mailOptions)

    if (info.accepted[0] === emailAddress) {
      return verificationCode
    } else {
      return null
    }
  }
}
exports.Email = Email
//
