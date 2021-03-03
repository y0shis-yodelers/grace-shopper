/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const product = {
      name: 'Very Generic Pick',
      inventory: 34,
      price: 100
    }

    beforeEach(() => {
      return Product.create(product)
    })

    it('GET /api/products returns products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(product.name)
      expect(res.body[0].inventory).to.be.equal(product.inventory)
      expect(res.body[0].price).to.contain(product.price)
    })
  })

  describe('/api/products/:productId', () => {
    const POD = {
      name: 'Pick of Destiny',
      inventory: 1,
      price: 100000
    }

    beforeEach(() => {
      return Product.create(POD)
    })

    it('GET /api/products/:productId returns single product', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(POD.name)
      expect(res.body.inventory).to.be.equal(POD.inventory)
      expect(+res.body.price).to.be.equal(POD.price)
    })
  })

  //   describe('POST api/users/:userId', () => {
  //     const Alice = {
  //       name: 'Alice',
  //       email: 'alice@alice.com',
  //       address: '101 alice way chicago il 60660',
  //       phoneNumber: '15551234567',
  //       userType: 'registered',
  //       isAdmin: false
  //     }

  //     it('POST /api/users/:userId', async () => {
  //       const res = await request(app)
  //         .get('/api/users/2')
  //         .expect(200)

  //       expect(res.body).to.be.an('object')
  //       expect(res.body).to.deep.equal(Alice)
  //     })
  //   })
}) // end describe('User routes')
