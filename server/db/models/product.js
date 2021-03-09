const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This is a placeholder description.'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/4/4e/Volkswagen_Bus_Pick_Guitar.JPG',
    validate: {
      isUrl: true
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
