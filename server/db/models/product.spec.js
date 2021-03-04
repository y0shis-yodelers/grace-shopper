/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields name, description, imageUrl, inventory, price', async () => {
    const product = await Product.create({
      name: 'Pick of Destiny',
      description: "It's the Pick of Destiny, child!",
      imageUrl:
        'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png',
      inventory: 1,
      price: 100000
    })

    expect(product.name).to.equal('Pick of Destiny')
    expect(product.description).to.equal("It's the Pick of Destiny, child!")
    expect(product.imageUrl).to.equal(
      'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png'
    )
    expect(product.inventory).to.equal(1)
    expect(product.price).to.equal(100000)
  })

  it('requires name fields', async () => {
    try {
      const noName = await Product.create({
        name: null,
        description: "It's the Pick of Destiny, child!",
        imageUrl:
          'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png',
        inventory: 1,
        price: 100000
      })

      try {
        await Product.create(noName)
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }
    } catch (err) {
      expect(err.message).to.contain('notNull Violation')
    }
  })

  it('requires name to be not empty', async () => {
    try {
      const emptyName = await Product.create({
        name: '',
        description: "It's the Pick of Destiny, child!",
        imageUrl:
          'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png',
        inventory: 1,
        price: 100000
      })

      try {
        await Product.create(emptyName)
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty')
      }
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty')
    }
  })

  it('requires inventory to be equal or geater than zero', async () => {
    try {
      const emptyName = await Product.create({
        name: 'Pick of Destiny',
        description: "It's the Pick of Destiny, child!",
        imageUrl:
          'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png',
        inventory: -1,
        price: 100000
      })

      try {
        await Product.create(emptyName)
      } catch (err) {
        expect(err.message).to.contain('Validation min')
      }
    } catch (err) {
      expect(err.message).to.contain('Validation min')
    }
  })

  it('requires price to be equal or geater than zero', async () => {
    try {
      const emptyName = await Product.create({
        name: 'Pick of Destiny',
        description: "It's the Pick of Destiny, child!",
        imageUrl:
          'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png',
        inventory: 1,
        price: -100000
      })

      try {
        await Product.create(emptyName)
      } catch (err) {
        expect(err.message).to.contain('Validation min')
      }
    } catch (err) {
      expect(err.message).to.contain('Validation min')
    }
  })

  it('uses INTEGER data type for price', async () => {
    await Product.create({
      name: 'Pick of Destiny',
      description: "It's the Pick of Destiny, child!",
      imageUrl:
        'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png',
      inventory: 1,
      price: 100000
    })

    expect(Product.tableAttributes.price.type.constructor.key).to.equal(
      'INTEGER'
    )
  })
})
