const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  isPaid: {
    type: Sequelize.BOOLEAN,
  },
  pricePaid: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
})

module.exports = Orders
