const router = require('express').Router()
const {Orders, Product} = require('../db/models')
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
    const order = await Orders.findByPk(req.params.orderId, {
      include: [{model: Product}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// GET all paid orders by userId
router.get('/users/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    const userOrders = await Orders.findAll({
      where: {userId: userId, isPaid: true},
      include: [{model: Product}]
    })

    res.json(userOrders)
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
    const order = await Orders.findByPk(req.params.orderId)
    await order.destroy()
    res.send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
