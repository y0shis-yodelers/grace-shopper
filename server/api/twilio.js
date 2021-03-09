const twilio = require('twilio')

//account keys and secure information
const accountSid =
  process.env.ACCOUNT_SID || require('../../secrets').accountSid
const authToken = process.env.AUTH_TOKEN || require('../../secrets').authToken
const phone = process.env.PHONE || require('../../secrets').phone

const sendSMS = user => {
  const today = new Date()
  const tomorrow = new Date(today)
  const delivery = `${tomorrow.getMonth() + 1}/${tomorrow.getDate() + 2}`

  const formatted = `+1${user.phoneNumber}`

  const client = new twilio(accountSid, authToken)
  client.messages
    .create({
      body: `Thanks for your order ${
        user.name
      }! Expect to be rocking by ${delivery}!`,
      to: '+12243879750', // Text this number -> formatted
      from: phone // From a valid Twilio number
    })
    .then(message => console.log(message.sid))
}

module.exports = sendSMS
