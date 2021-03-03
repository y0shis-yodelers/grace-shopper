const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')
const Order = require('./order')
const Address = require('./address')

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

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Cart)
Cart.hasMany(Product)

User.hasOne(Cart)
Cart.belongsTo(User)

Product.belongsToMany(Order)
Order.hasMany(Product)

User.hasMany(Address)
Address.belongsToMany(User)

module.exports = {
  User,
  Cart,
  Product,
  Order,
  Address
}
