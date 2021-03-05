/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')

describe('Orders routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})

    const seedUsers = require('../../script/seed/users-seed')
    const seedOrders = require('../../script/seed/orders-seed')

    await Promise.all(
      seedUsers.map(user => {
        return User.create(user)
      })
    )

    await Promise.all(
      seedOrders.map(order => {
        return Order.create(order)
      })
    )
  })

  describe('/api/orders', async () => {
    it('allows an admin user to GET all order', async () => {
      const orders = await request.agent(app).get('/api/orders')
      expect(orders.body).to.be.an('array')
      expect(orders.body.length).to.equal(10)
    })
  })

  describe('/api/orders/:orderId', () => {
    it('allows an admin user to GET a specific order', async () => {
      const order = await request.agent(app).get(`/api/orders/1`)
      expect(order.body).to.be.an('object')
    })
  })
})
