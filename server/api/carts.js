const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')
const {isAdminOrUser} = require('./gatekeepingMiddleware')
module.exports = router

// GET order that represents user cart
router.get('/users/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    const orderThatHoldsCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isPaid: false
      },
      include: {model: Product}
    })
    res.json(orderThatHoldsCart.products)
  } catch (err) {
    next(err)
  }
})

router.put('/users/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    // get cart
    const orderThatHoldsCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isPaid: false
      },
      include: {model: Product}
    })

    // get productId, quantity
    const {productId, quantity} = req.body

    // update the ProductOrder instance
    const [
      productOrderToBeUpdated,
      wasCreated
    ] = await ProductOrder.findOrCreate({
      where: {
        productId: productId,
        orderId: orderThatHoldsCart.id
      }
    })

    // if quantity === 0 then destroy the ProductOrder instance
    if (quantity === 0) return await productOrderToBeUpdated.destroy()

    // if found and not created, update the ProductOrder instance's quantity
    if (!wasCreated) productOrderToBeUpdated.quantity = quantity
    await productOrderToBeUpdated.save()

    // fetch the product that's been updated if quantity
    // was NOT zero
    let updatedProduct
    if (quantity !== 0)
      updatedProduct = await Product.findByPk(productOrderToBeUpdated.productId)

    res.status(201).send(updatedProduct)
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
    // get cart
    const orderThatHoldsCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isPaid: false
      },
      include: {model: Product}
    })

    // destroy each ProductOrder instance
    // this disassociates products from the user's unfulfilled order
    // causing them to be "removed" from the user's cart
    await Promise.all(
      orderThatHoldsCart.products.map(async item => {
        const productToBeRemovedFromCart = item.ProductOrder
        await productToBeRemovedFromCart.destroy()
      })
    )

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
