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

  describe('/api/orders', () => {
    try {
      it('allows an admin user to GET all order', async () => {
        const orders = await request.agent(app).get('/api/orders')
        expect(orders.body).to.be.an('array')
        expect(orders.body.length).to.equal(20)
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })

  describe('/api/orders/:orderId', () => {
    try {
      it('allows an admin user to GET a specific order', async () => {
        const order = await request.agent(app).get(`/api/orders/1`)
        expect(order.body).to.be.an('object')
        expect(order.body.isPaid).to.be.an('boolean')
        console.log(order.body)
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })

  describe('/api/orders/:orderId', () => {
    try {
      it('has a user associated with every order', async () => {
        const order = await request.agent(app).get('/api/orders/1')
        expect(order.body.userId).to.not.be.an('undefined')
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })

  describe('api/orders/:orderId', () => {
    it('has products associated with every order', async () => {
      const order = await request.agent(app).get('/api/orders/1')
      expect(order.body.products).to.be.an('array')
    })
  })

  describe('POST /orders', () => {
    try {
      it('creates a new order and sends back the new order', async () => {
        const res = await request
          .agent(app)
          .post('/api/orders')
          .send({
            isPaid: false,
            // userId: 11,
            date: Date.now()
          })
          .expect(201)
        expect(res.body).to.be.an('object')
        expect(res.body.isPaid).to.equal(false)
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })

  describe('PUT /orders/:orderId', () => {
    try {
      it('updates an existing order', async () => {
        const editedOrder = await request
          .agent(app)
          .put('/api/orders/1')
          .send({
            isPaid: false,
            userId: 2
          })
        // console.log(editedOrder)
        expect(editedOrder.body).to.be.an('object')
        expect(editedOrder.body.isPaid).to.equal(false)
        expect(editedOrder.body.userId).to.equal(2)
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })

  describe('DELETE /orders', () => {
    try {
      it('deletes an order', async () => {
        const deletedOrder = await request.agent(app).delete(`/api/orders/1`)
        expect(deletedOrder.body.id).to.equal(1)
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})
