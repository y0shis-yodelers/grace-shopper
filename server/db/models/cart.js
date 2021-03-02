const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0
    }
  }
})

Cart.prototype.updateQuantity = function(amount) {
  this.quantity += amount
  return this
}

module.exports = Cart
