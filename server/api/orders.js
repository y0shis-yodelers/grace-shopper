const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
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

// GET all paid orders by userId
router.get('/users/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    const userOrders = await Order.findAll({
      where: {userId: userId, isPaid: true},
      include: {model: Product}
    })

    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})

// GET single paid order by userId + orderId
router.get(
  '/users/:userId/orders/:orderId',
  isAdminOrUser,
  async (req, res, next) => {
    try {
      const {userId, orderId} = req.params
      const userOrder = await Order.findAll({
        where: {userId: userId, id: orderId, isPaid: true},
        include: {model: Product}
      })

      res.json(userOrder)
    } catch (error) {
      next(error)
    }
  }
)

// Creates an order
router.post('/', isAdminOrUser, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Order.create(data)
    res.status(201).json(dataValues)
    // res.send(await Order.create(req.body))
  } catch (error) {
    next(error)
  }
})

//create a new cart when order is compelte
router.post('/users/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    const data = req.body
    const user = await User.findByPk(req.params.userId)
    const newOrder = await Order.create({
      isPaid: false,
      userId: req.params.userId
    })
    //newOrder.setUser(user)
    user.hasOrder(newOrder)
    console.log('blue', newOrder)
    console.log('red', user)
    res.status(201).json(newOrder)
    // res.send(await Order.create(req.body))
  } catch (error) {
    next(error)
  }
})

// Updates an order
router.put('/:orderId', isAdminOrUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {include: Product})

    const {date, isPaid, products, userId} = req.body

    console.log(
      'date, isPaid, products, userId is, ',
      date,
      isPaid,
      products,
      userId
    )

    const updateOrderInfo = {
      date,
      isPaid,
      products,
      userId
    }

    console.log('updateOrderInfo is, ', updateOrderInfo)

    const updatedOrder = await order.update(updateOrderInfo, {
      returning: true
    })

    console.log('updatedOrder in PUT route is, ', updatedOrder)
    res.json(updatedOrder)
  } catch (error) {
    next(error)
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
