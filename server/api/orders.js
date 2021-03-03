const router = require('express').Router()
const {Order, Product, Address} = require('../db/models')

// Gets all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// Gets single order
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPK(req.params.orderId, {
      include: [{model: Product}, {model: Address}]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// Creates an order
router.post('/', async (req, res, next) => {
  try {
    res.send(await Order.create(req.body))
  } catch (error) {
    next(error)
  }
})

// Deletes an order
router.delete('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPK(req.params.orderId)
    await order.destroy()
    res.send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
