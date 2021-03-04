/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  const alice = {
    name: 'Alice',
    inventory: 5,
    price: 1212
  }

  const noStock = {
    name: "I'm out of stock",
    inventory: 0,
    price: 1
  }

  beforeEach(async () => {
    await db.sync({force: true})

    const seedProducts = require('../../script/seed/products-seed')

    await Promise.all(
      seedProducts.map(product => {
        return Product.create(product)
      })
    )
  })

  describe('`/products` URI', () => {
    it('GET responds with all products', async () => {
      const allProducts = await request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(10)
        })
    })

    it('POST responds with created product', async () => {
      const createProduct = await request
        .agent(app)
        .post('/api/products')
        .send(alice)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('Alice')
          expect(res.body.inventory).to.be.equal(5)
          expect(res.body.price).to.be.equal(1212)
        })
    })
  })

  describe('`/products/:productId` URI', () => {
    it('GET responds with single product', async () => {
      const createProduct = await request
        .agent(app)
        .post('/api/products')
        .send(alice)
        .expect(200)

      const singleProduct = await request(app)
        .get('/api/products/11')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('Alice')
          expect(res.body.inventory).to.be.equal(5)
          expect(res.body.price).to.be.equal(1212)
        })
    })
  })

  describe('`/products/admin` URI', () => {
    it('GET responds with all products (admin level)', async () => {
      const createProduct = await request
        .agent(app)
        .post('/api/products')
        .send(noStock)
        .expect(200)

      const allProducts = await request(app)
        .get('/api/products/admin')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(11)
        })
    })
  })
})
