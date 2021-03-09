# Bass Shopper - an eCommerce application built using React

## Visit

https://grace-shopper-yy.herokuapp.com

## Features to Try!

Go ahead and play with our store! **Payments is sandboxed/test environment, so there will be no real charges made**

* Sign up using either Google or a normal login, be sure to add your phone number for later :)
* Add multiple Products to your cart and watch it follow you across the site
* Clear your cart to remove all your items in an instance
* Checkout using Safari (on Mac or iPhones) or Chrome to use Apple Pay/Google Pay
  * Even though will complete the checkout, **you will not be charged**
* Check your phone for a confirmation text and email!
* Revisit your profile to see the completed order

## Technologies

* Front End
  * React.js, Redux.js, HTML5, CSS3
* Back-End
  * Node.js, Express.js, PostgreSQL, Sequelize
* External API/Libraries
  * Stripe/Apple Pay/Google Pay: Payment Processing Providers
  * Twilio & Nodemailer: SMS and Email order notifications
  * Google Authentication: Login security provider
  * React-Toastify: In App Notifications
  * React-Table & Phone-FNS: Great data formatting
* Deployment
  * Heroku: Live website with public URL

## Future Roadmap

* White Labeling/Multitendancy for scaling ability to sell software
* Greater Accessibility for visually impaired customers
* Admin Dashboard to view sales and other key performance indicators
  * Visual.js for graphing of sales
* Social Media Integration and Top Sellers Recommendation
* Better mobile phone integration

## Authors

[Daniel Shapiro](https://www.linkedin.com/in/shapirodanieladam/) - [Kush Patel](https://www.linkedin.com/in/kushpatel21/) - [Zoran Bajic](https://www.linkedin.com/in/zoranbajic/) - [Gene Kaufman](https://github.com/TwelveEyes)

### Installation

#### Store your private infromation in a new file secrets.js\* or global environmenal variables

```
module.exports = {
  pw: 'email password', //password to email used in nodemailer
  ccEmail: 'email1, email2, etc...', //personal emails to cc
  accountSid: 'AXXXXXXXXXXXXX', //twilio accountSID
  authToken: 'XXXXXXXXXXXXXX', //twilio auth token
  phone: '+12345678901'  //Twilio phone number
}
```

\*sendSMS and sendEmail Functions may be commented out to prevent creation of secrets.js
