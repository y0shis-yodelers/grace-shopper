const {green, red} = require('chalk')
const db = require('../server/db/db')
const {
  Address,
  Orders,
  Product,
  ProductOrders,
  User
} = require('../server/db/models')

const users = require('./seed/users-seed')
const addresses = require('./seed/addresses-seed')
const orders = require('./seed/orders-seed')
const products = require('./seed/products-seed')
const productOrders = require('./seed/productorders-seed')

const seedRoutine = async () => {
  try {
    await db.sync({force: true})

    // users
    const returnedUsersAfterSeed = await User.bulkCreate(users, {
      returning: true
    })
    console.log(green(`Seeded ${returnedUsersAfterSeed.length} users`))

    // addresses
    const returnedAddressesAfterSeed = await Address.bulkCreate(addresses, {
      returning: true
    })
    console.log(green(`Seeded ${returnedAddressesAfterSeed.length} addresses`))

    // products
    const returnedProductsAfterSeed = await Product.bulkCreate(products, {
      returning: true
    })
    console.log(green(`Seeded ${returnedProductsAfterSeed.length} products`))

    // orders
    const returnedOrdersAfterSeed = await Orders.bulkCreate(orders, {
      returning: true
    })
    console.log(green(`Seeded ${returnedOrdersAfterSeed.length} orders`))

    // ProductOrders
    const returnedProductOrdersAfterSeed = await ProductOrders.bulkCreate(
      productOrders,
      {returning: true}
    )
    console.log(
      green(`Seeded ${returnedProductOrdersAfterSeed} product_orders`)
    )

    console.log(green('Database sucessfully seeded'))
  } catch (error) {
    console.log(red(error))
  }
}

module.exports = seedRoutine
