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
