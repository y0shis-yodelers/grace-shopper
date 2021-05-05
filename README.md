# Bass Shopper 

_an eCommerce application built using React_

## Visit

https://grace-shopper-yy.herokuapp.com

## Features to Try!

Go ahead and play with our store! **Payments is sandboxed/test environment, so there will be no real charges made**

* Sign up using either Google or local login
* Add multiple products to your cart and watch it follow you across the site
* Clear your cart to remove all your items in an instance
* Update your profile with your phone, name and email before the next step!
* Checkout using Safari (Mac/iPhones) or Chrome to use Apple Pay or Google Pay
  * Even though you will checkout, **you will not be charged**
* Check your phone for a confirmation text and email!
* Revisit your profile to see all completed order
* Visit https://grace-shopper-yy.herokuapp.com/oops to visit our fun 404 not found page!
* Are you trying to hack us? Gandalf says no if you are not an admin! https://grace-shopper-yy.herokuapp.com/admin/users
* Read **even more** about the technical features in our Detailed_Features.md!

## Technologies

* Front-End
  * React.js, Redux.js, HTML5, CSS3
* Back-End
  * Node.js, Express.js, PostgreSQL, Sequelize
* External API/Libraries
  * Stripe/Apple Pay/Google Pay: Payment Processing
  * Twilio & Nodemailer: SMS and Email order notifications
  * Google Authentication: Login security provider
  * React-Toastify: In-App Notifications
* Deployment
  * Heroku: Live website with public URL
  * Mocha/Chai: Unit testing of 90% of modules for faster developement
  * Travis: Continuous Integration and Continuous Deployment

## Future Roadmap

* White Labeling/Multitendancy for scaling ability to sell software
* Greater Accessibility for visually impaired customers (A11Y)
* Admin Dashboard to view sales and other key performance indicators
  * Visual.js for graphing of sales
* Social Media Integration and Top Sellers Recommendation
* Better mobile phone integration

## Authors

[Daniel Shapiro](https://www.linkedin.com/in/shapirodanieladam/) - [Kush Patel](https://www.linkedin.com/in/kushpatel21/) - [Zoran Bajic](https://www.linkedin.com/in/zoranbajic/) - [Gene Kaufman](https://github.com/TwelveEyes)

## Installation

* To install all dependencies: `npm run install`
* To create database and seed: `createdb grace-shopper-yy && createdb grace-shopper-yy-test`
* Seed Database with products and accounts: `npm run seed`
* To Run App!: `npm run start-dev`

#### Store your private infromation in a new file secrets.js\* or global environmenal variables

###### sendSMS and sendEmail Functions may be commented out to prevent creation of secrets.js

```
module.exports = {
  pw: 'email password', //password to email used in nodemailer
  ccEmail: 'email1, email2, etc...', //personal emails to cc
  accountSid: 'AXXXXXXXXXXXXX', //twilio accountSID
  authToken: 'XXXXXXXXXXXXXX', //twilio auth token
  phone: '+12345678901'  //Twilio phone number
}
```
