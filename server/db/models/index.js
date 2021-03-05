const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Address = require('./address')
const ProductOrder = require('./productorder')

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

User.hasMany(Order)
Order.belongsTo(User)

User.belongsToMany(Address, {through: 'UserAddress'})
Address.belongsToMany(User, {through: 'UserAddress'})

Product.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Product, {through: ProductOrder})

module.exports = {
  User,
  Product,
  Order,
  Address,
  ProductOrder
}
