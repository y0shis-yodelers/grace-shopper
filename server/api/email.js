const nodemailer = require('nodemailer')

const pw = process.env.EMAIL_PW || require('../../secrets').pw
const ccEmail = process.env.CC_EMAIL || require('../../secrets').ccEmail

console.log(pw)
const email = 'yoshis.yodelers@gmail.com'

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
    to: `${userEmail}`,
    cc: ccEmail,
    subject: 'Bass Shopper Order Confirmation!',
    text: `Thank you for your order. It will be shipping soon. Order Number: ${order}`
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
