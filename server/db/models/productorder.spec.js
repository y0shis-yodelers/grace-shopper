/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const queryInterface = db.getQueryInterface()
const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const ProductOrder = db.model('ProductOrder')

const users = require('../../../script/seed/users-seed')
const products = require('../../../script/seed/products-seed')
const orders = require('../../../script/seed/orders-seed')

describe('ProductOrder Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields isPaid, pricePaid, quantity', async () => {
    // seed users
    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    // seed products
    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    // queryInterface won't generate createdAt values
    // so we force them onto orders here
    const fakeEntryOrders = orders.map(order => {
      order.createdAt = new Date()
      order.updatedAt = new Date()
      return order
    })

    // queryInterface allows us to bulkInsert already-associated orders
    await queryInterface.bulkInsert('orders', fakeEntryOrders)

    // pull in the through table ProductOrder
    const newProductOrders = await ProductOrder.findAll()

    expect(newProductOrders).to.be.an('array')
  })
})
