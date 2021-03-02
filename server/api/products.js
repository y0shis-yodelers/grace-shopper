const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

// get all products route '/api/product'
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        inventory: {
          [Op.gt]: 0
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// get single product route '/api/product/:productId'
router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId

    if (isNaN(id)) res.status(400).send(id + ' is not a number!')
    else {
      const product = await Product.findByPk(id)
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})
