const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')
const db = require('../db')
const Order = db.model('order')
const User = db.model('user')
const Product = db.model('product')
const ProductOrder = db.model('ProductOrder')

describe('Carts routes', () => {
  const user = {
    name: 'lily',
    email: 'lily@dog.com',
    password: '1234'
  }

  const order = {
    isPaid: false,
    date: null,
    userId: 1
  }

  const products = [
    {
      name: 'Ableton',
      description:
        'Rock out in eye-popping style with these killer picks! Each pick is made of abalone and unicorn dreams: their comfortable, wide-body design is as perfect for beginners as it is well-suited to Lenny Kravitz.',
      imageUrl: 'https://imgur.com/AZykHw6.jpg',
      inventory: 3,
      price: 765
    },
    {
      name: 'AC Noises',
      description:
        'Sometimes the glimmer of a brand-new guitar pick is all we need to rouse our musical spirits. Available in an array of festive colors, this hand-carved pick will leave your fingers free to do their magic! It really is the most wonderful time of the year.',
      imageUrl: 'https://imgur.com/zNwEcoz.jpg',
      inventory: 53,
      price: 334
    }
  ]

  const productOrders = [
    {
      pricePaid: 10,
      quantity: 1,
      productId: 1,
      orderId: 1
    },
    {
      pricePaid: 5,
      quantity: 2,
      productId: 2,
      orderId: 1
    }
  ]

  beforeEach(async () => {
    await db.sync({force: true})

    const newUser = await User.create(user)
    const newOrder = await Order.create(order)

    await newUser.setOrders([newOrder.id])
    await newUser.save()

    await Promise.all(products.map(product => Product.create(product)))

    await Promise.all(productOrders.map(po => ProductOrder.create(po)))
  })

  describe('GET /api/carts/:userId', () => {
    it('allows admin users or current user to GET a single cart', async () => {
      try {
        const foundUser = await User.findByPk(1, {
          include: {model: Order, include: {model: Product}}
        })

        const {body} = await request
          .agent(app)
          .get(`/api/carts/${foundUser.id}`)

        expect(body.products[0]).to.deep.include(products[0])
        expect(body.products[1]).to.deep.include(products[1])
      } catch (err) {
        console.error(err)
        throw err
      }
    })
  })

  describe('PUT /api/carts/:userId', () => {
    it('allows admin users or current user to PUT/update a single cart item,', async () => {
      const updateInfo = {
        productId: 1,
        quantity: 5
      }

      try {
        await request
          .agent(app)
          .put(`/api/carts/1`)
          .send(updateInfo)

        const foundUser = await User.findByPk(1, {
          include: {model: Order, include: {model: Product}}
        })

        expect(foundUser.dataValues).to.have.nested.property(
          'orders[0].products[0].ProductOrder.quantity',
          5
        )
      } catch (err) {
        console.error(err)
        throw err
      }
    })
  })

  describe('DELETE /api/carts/:userId', () => {
    it('allows admin users or current user to DELETE/clear the entire cart,', async () => {
      try {
        const userBeforeCartDeleted = await User.findByPk(1, {
          include: {model: Order, include: {model: Product}}
        })

        await request.agent(app).del(`/api/carts/1`)

        const userAfterCartDeleted = await User.findByPk(1, {
          include: {model: Order, include: {model: Product}}
        })

        expect(
          userBeforeCartDeleted.dataValues.orders[0].products
        ).to.have.length(2)

        expect(
          userAfterCartDeleted.dataValues.orders[0].products
        ).to.have.length(0)
      } catch (err) {
        console.error(err)
        throw err
      }
    })
  })
})
