const User = require('./user')
const Product = require('./product')
const Orders = require('./orders')
const Address = require('./address')
const ProductOrders = require('./productorders')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Orders)
Orders.belongsTo(User)

User.belongsToMany(Address, {through: 'UserAddress'})
Address.belongsToMany(User, {through: 'UserAddress'})

Product.belongsToMany(Orders, {through: ProductOrders})
Orders.belongsToMany(Product, {through: ProductOrders})

module.exports = {
  User,
  Product,
  Orders,
  Address
}
