const router = require('express').Router()
const {Cart} = require('../db/models')

//GET all items in cart
router.get('/:cartID', async (req, res, next) => {
  try {
    const items = await Cart.findAll({
      where: {cartID: req.params.cartID}
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// //Add item to cart
// router.post('/', async (req, res, next) => {
//   try {
//     const allItems = req.body
//     await allItems.forEach((item) => {
//       Cart.create(item)
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// //Add item to cart
// router.post('/:cartID/product/:productID', async (req, res, next) => {
//   try {
//     const [item, wasCreated] = await Cart.findOrCreate({
//       returning: true,
//       where: {cartID: req.params.cartID, productId: req.params.productID},
//     })

//     if (wasCreated) {
//       res.json(item)
//     } else {
//       item.updateQuantity(req.body.amount).save()
//       res.json(item)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// //edit item quantity in cart
// router.put('/:cartID/product/:productID', async (req, res, next) => {
//   try {
//     const item = await Cart.findOne({
//       returning: true,
//       where: {cartID: req.params.cartID, productId: req.params.productID},
//     })
//     item.updateQuantity(req.body.amount).save()
//     res.json(item)
//   } catch (error) {
//     next(error)
//   }
// })

//Delete/remove single item in cart
router.delete('/:cartID/product/:productID', async (req, res, next) => {
  try {
    const numItems = await Cart.destroy({
      where: {cartID: req.params.cartID, productId: req.params.productID}
    })
    res.json(numItems)
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
    res.json(numItems)
  } catch (error) {
    next(error)
  }
})
