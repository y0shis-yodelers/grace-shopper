/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Address = db.model('address')
const Order = db.model('order')
const Product = db.model('product')
const User = db.model('user')
const ProductOrder = db.model('ProductOrder')

describe('Model Associations', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  const address = {
    number: '100',
    streetName: 'Broad St',
    houseOrApt: 'apartment',
    city: 'Philadelphia',
    state: 'PA',
    zip: '19104'
  }
  const user = {
    name: 'lily',
    email: 'lily@dog.com',
    password: 'imabeagle'
  }
  const order = {
    isPaid: true,
    userId: 1
  }
  const productOrder = {
    pricePaid: 1000,
    quantity: 10,
    productId: 1,
    orderId: 1
  }
  const product = {
    name: 'Pick of Destiny',
    description: "It's the Pick of Destiny, child!",
    imageUrl:
      'https://static.wikia.nocookie.net/tenaciousd/images/a/af/PickofDestiny.png',
    inventory: 1,
    price: 100000,
    ProductOrder: [productOrder]
  }

  it('Each order belongs to one User, each User has many Orders', async () => {
    const newUser = await User.create(user)
    const newOrder = await Order.create(order)
    await newUser.setOrders([newOrder.id])
    await newUser.save()
    const foundUser = await User.findByPk(1, {include: Order})
    expect(foundUser.orders[0]).to.include(order)
  })

  it('Each User has many Addresses, each Address belongs to many Users', async () => {
    const newUser = await User.create(user)
    const newAddress = await Address.create(address)
    await newUser.setAddresses([newAddress.id])
    await newUser.save()
    const foundUser = await User.findByPk(1, {include: Address})
    expect(foundUser.addresses[0]).to.include(address)
  })

  it('Each Order has many Products, each Product belongs to many Orders', async () => {
    const newUser = await User.create(user)
    const newOrder = await Order.create(order)
    const newProduct = await Product.create(product)
    await newOrder.setProducts([newProduct.id])
    await newOrder.save()
    await newUser.setOrders([newOrder.id])
    await newUser.save()
    const foundUser = await User.findByPk(1, {
      include: {model: Order, include: {model: Product}}
    })

    expect(foundUser.dataValues).to.have.nested.property(
      'orders[0].products[0].description',
      "It's the Pick of Destiny, child!"
    )
  })
})
