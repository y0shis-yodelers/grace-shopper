const router = require('express').Router()
const {Cart} = require('../db/models')

//GET all items in cart
router.get('/:cartID', async (req, res, next) => {
  try {
    const items = await Cart.findAll({
      where: {cartID: req.params.cartID}
    })
    res.send(items)
  } catch (error) {
    next(error)
  }
})

//Add item to cart
router.post('/:cartID/product/:productID', async (req, res, next) => {
  try {
    const [item, wasCreated] = await Cart.findOrCreate({
      returning: true,
      where: {cartID: req.params.cartID, productId: req.params.productId}
    })

    if (wasCreated) {
      res.send(item)
    } else {
      item.updateQuantity(req.body.amount).save()
    }
  } catch (error) {
    next(error)
  }
})

//edit item quantity in cart
router.put('/:cartID/product/:productID', async (req, res, next) => {
  try {
    const [item, wasCreated] = await Cart.update(req.body, {
      returning: true,
      where: {cartID: req.params.cartID, productId: req.params.productId}
    })
    res.send(item)
  } catch (error) {
    next(error)
  }
})

//Delete/remove single item in cart
router.delete('/:cartID/product/:productID', async (req, res, next) => {
  try {
    const numItems = await Cart.destroy({
      where: {cartID: req.params.cartID, productId: req.params.productId}
    })
    res.send(numItems)
  } catch (error) {
    next(error)
  }
})

//Delete entire cart/remove all items in cart
router.delete('/:cartID', async (req, res, next) => {
  try {
    const numItems = await Cart.destroy({
      where: {cartID: req.params.cartID}
    })
    res.send(numItems)
  } catch (error) {
    next(error)
  }
})
