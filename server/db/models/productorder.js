const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('ProductOrder', {
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

module.exports = ProductOrder
