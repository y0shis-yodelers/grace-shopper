const nodemailer = require('nodemailer')
const {email, pw} = require('../../secrets')

const sendEmail = (userEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: pw
    }
  })

  const mailOptions = {
    from: email,
    to: `${userEmail}, kushpatel21@gmail.com`,
    subject: 'Bass Shopper Order!',
    text: `Thank you for your order. It will be shipping soon. ${order}`
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = sendEmail
