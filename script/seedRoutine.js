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
const userAddresses = require('./seed/useraddress-seed')

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
      green(`Seeded ${returnedProductOrdersAfterSeed.length} product_orders`)
    )

    // UserAddress
    const fakeEntryUserAddress = userAddresses.map(entry => {
      entry.createdAt = new Date()
      entry.updatedAt = new Date()
      return entry
    })

    // queryInterface allows us to force seed the association
    // as a complete through table
    const queryInterface = db.getQueryInterface()

    // reference 'UserAddress' as defined in our associations
    await queryInterface.bulkInsert('UserAddress', fakeEntryUserAddress)

    console.log('UserAddress table successfully created and associated!')

    console.log(green('Database sucessfully seeded'))
  } catch (error) {
    console.log(red(error))
  }
}

module.exports = seedRoutine
