const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrders = db.define('ProductOrders', {
  pricePaid: {
    type: Sequelize.INTEGER,
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

module.exports = ProductOrders
