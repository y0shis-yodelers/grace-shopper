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
      await request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(10)
        })
    })

    it('POST responds with created product', async () => {
      await request
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
      await request
        .agent(app)
        .post('/api/products')
        .send(alice)
        .expect(200)

      await request(app)
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
})
