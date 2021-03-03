const router = require('express').Router()
const {Orders, Product, Address} = require('../db/models')
const {isAdmin, isAdminOrUser} = require('./gatekeepingMiddleware')

// Gets all orders
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Orders.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// Gets single order
router.get('/:orderId', isAdminOrUser, async (req, res, next) => {
  try {
    const order = await Orders.findByPK(req.params.orderId, {
      include: [{model: Product}, {model: Address}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// Creates an order
router.post('/', isAdminOrUser, async (req, res, next) => {
  try {
    res.send(await Orders.create(req.body))
  } catch (error) {
    next(error)
  }
})

// Deletes an order
router.delete('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const order = await Orders.findByPK(req.params.orderId)
    await order.destroy()
    res.send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
