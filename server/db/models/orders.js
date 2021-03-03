const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  pricePaid: {
    type: Sequelize.DECIMAL(10, 2),
    //dont use decimal for money
    //use integer and convert to penny
    //hook to convert to penny
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Orders
