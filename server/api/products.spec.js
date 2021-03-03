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

  describe('`/products` URI', () => {
    const products = [
      {
        name: 'Very Generic Pick',
        inventory: 34,
        price: 100
      },
      {
        name: 'Generic Pick 2',
        inventory: 22,
        price: 123
      },
      {
        name: 'Pick your nose',
        inventory: 34,
        price: 222
      },
      {
        name: 'Satanic Pick',
        inventory: 666,
        price: 666
      }
    ]

    const alice = {
      name: 'Alice',
      inventory: 5,
      price: 1212
    }

    beforeEach(() => {
      products.forEach(product => {
        return Product.create(product)
      })
    })

    it('GET responds with all products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      res.body.forEach((product, index) => {
        expect(product.name).to.be.equal(products[index].name)
        expect(product.inventory).to.be.equal(products[index].inventory)
        expect(product.price).to.be.equal(products[index].price)
      })
    })

    it('POST responds with created product', async () => {
      db.drop()
      const res = await request(app)
        .post('/api/products', alice)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Alice')
    })
  })

  describe('`/products/:productId` URI', () => {
    const POD = {
      name: 'Pick of Destiny',
      inventory: 1,
      price: 100000
    }

    beforeEach(() => {
      return Product.create(POD)
    })

    it('GET responds with single product', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(POD.name)
      expect(res.body.inventory).to.be.equal(POD.inventory)
      expect(+res.body.price).to.be.equal(POD.price)
    })
  })
})
