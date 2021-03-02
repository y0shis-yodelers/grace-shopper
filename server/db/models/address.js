const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  houseOrApt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 5],
    },
  },
})

module.exports = Address
