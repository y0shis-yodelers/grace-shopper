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
      expect(order.body.isPaid).to.be.an('boolean')
      expect(order.body.pricePaid).to.be.an('number')
      expect(order.body.quantity).to.be.an('number')
    })
  })

  describe('/api/orders/:orderId', () => {
    it('has a user associated with every order', async () => {
      const order = await request.agent(app).get('/api/orders/1')
      expect(order.body.userId).to.not.be.an('undefined')
    })
  })

  describe('api/orders/:orderId', () => {
    it('has products associated with every order', async () => {
      const order = await request.agent(app).get('/api/orders/1')
      expect(order.body.products).to.be.an('array')
    })
  })

  describe.only('POST /orders', () => {
    it('creates a new order and sends back the new order', async () => {
      const res = await request
        .agent(app)
        .post('/api/orders')
        .send({
          isPaid: false,
          pricePaid: 352,
          quantity: 4
        })
        .expect(201)
      expect(res.body).to.be.an('object')
      expect(res.body.isPaid).to.equal(false)
      expect(res.body.pricePaid).to.equal(352)
      expect(res.body.quantity).to.equal(4)
      // console.log(res)
    })
  })
})
