const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Order
