const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
const {isAdminOrUser} = require('./gatekeepingMiddleware')
module.exports = router

// GET order that represents user cart
router.get('/users/:userId', isAdminOrUser, async (req, res, next) => {
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

router.put('/users/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    // get user
    const user = await User.findByPk(req.params.userId, {
      include: {model: Order, include: {model: Product}}
    })

    // get user's cartId, which is the unfulfilledOrder.id
    const orderId = user.orders.filter(order => !order.date)[0].id

    // get productId, quantity
    const {productId, quantity} = req.body

    // update the ProductOrder instance
    const [
      productOrderToBeUpdated,
      wasCreated
    ] = await ProductOrder.findOrCreate({
      where: {
        productId: productId,
        orderId: orderId
      }
    })

    // if quantity === 0 then destroy the ProductOrder instance
    if (quantity === 0) await productOrderToBeUpdated.destroy()

    // if product wasCreated return status 201
    if (wasCreated) return res.sendStatus(201)

    // otherwise, we need to update the quantity of productOrderToBeUpdated
    productOrderToBeUpdated.quantity = quantity
    await productOrderToBeUpdated.save()

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// DELETE clears a user's cart
// it does NOT delete the order the cart is derived from
// rather it destroys each ProductOrder on each products
// in the user's unfulfilledOrder.products array
router.delete('/users/:userId', isAdminOrUser, async (req, res, next) => {
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
