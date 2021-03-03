const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // isPaid: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false
  // },
  pricePaid: {
    type: Sequelize.DECIMAL(10, 2),
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

module.exports = Order
