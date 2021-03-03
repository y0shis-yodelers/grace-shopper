const {green, red} = require('chalk')
const {db} = require('../server/db')
const {User, Address, Product} = require('../server/db')
const users = require('./users-seed.js')
const addresses = require('./addresses-seed.js')
const products = require('./products-seed.js')

const seed = async () => {
  try {
    await db.sync({force: true})

    // seed users
    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    // seed addresses
    await Promise.all(
      addresses.map(address => {
        return Address.create(address)
      })
    )

    // seed products
    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
