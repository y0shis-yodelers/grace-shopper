const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {isAdmin, isAdminOrUser} = require('./gatekeepingMiddleware')

// Gets all orders
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// Gets single order
router.get('/:orderId', isAdminOrUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: {model: Product}
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// Creates an order
router.post('/', isAdminOrUser, async (req, res, next) => {
  try {
    res.send(await Order.create(req.body))
  } catch (error) {
    next(error)
  }
})

// Updates an order
router.put('/:orderId', isAdminOrUser, async (req, res, next) => {
  try {
    const data = req.body
    const {orderId} = req.params

    await Order.update({...data}, {where: {id: orderId}})

    res.sendStatus(204)
  } catch (err) {
    console.error(err)
  }
})

// Deletes an order
router.delete('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    await order.destroy()
    res.send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
