const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
const {isAdminOrUser} = require('./gatekeepingMiddleware')
module.exports = router

// GET order that represents user cart
router.get('/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isPaid: false
      },
      include: {model: Product}
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

// PUT user cart
router.put('/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    // get user
    const user = await User.findByPk(req.params.userId, {
      include: {model: Order, include: {model: Product}}
    })

    // extract cartContents from user's order history
    const cartContents = user.orders.filter(order => !order.date)[0].products

    // destroy each ProductOrder instance
    // this disassociates products from the user's unfulfilled order
    // causing them to be "removed" from the user's cart
    await Promise.all(
      cartContents.map(async item => {
        const productToBeRemovedFromCart = item.ProductOrder
        await productToBeRemovedFromCart.destroy()
      })
    )

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
