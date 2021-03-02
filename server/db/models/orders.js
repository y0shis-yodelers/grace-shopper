const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  isPaid: {
    type: Sequelize.BOOLEAN,
  },
  pricePaid: {
    type: Sequelize.FLOAT,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Orders
