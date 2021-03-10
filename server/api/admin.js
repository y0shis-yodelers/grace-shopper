const router = require('express').Router()
const {User, Address, Order, Product} = require('../db/models')
const {isAdmin} = require('./gatekeepingMiddleware')
module.exports = router

// GET all users route '/api/admin/users' (admin sees all users)

router.get('/users', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'phoneNumber', 'userType', 'isAdmin'],
      include: [{model: Address}, {model: Order, include: {model: Product}}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET all products route '/api/admin/products' (admin sees all products)
router.get('/products', isAdmin, async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
