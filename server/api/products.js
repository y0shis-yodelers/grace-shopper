const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin, isAdminOrUser} = require('./gatekeepingMiddleware')
const {Op} = require('sequelize')
module.exports = router

// GET all products route '/api/products' (client sees only products in stock)
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

// GET all products route '/api/products' (admin sees all products)
router.get('/admin', isAdmin, async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET single product route '/api/products/:productId'
router.get('/:productId', async (req, res, next) => {
  try {
    const {productId} = req.params

    if (isNaN(productId)) res.status(400).send(productId + ' is not a number!')
    else {
      const product = await Product.findByPk(productId)
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})

// POST create new product route '/api/products/'
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Product.create(data)

    res.json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit product route '/api/products/:productId'
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const data = req.body
    const {productId} = req.params

    await Product.update({...data}, {where: {id: productId}})

    res.json(data)
  } catch (error) {
    next(error)
  }
})

// DELETE product route '/api/products/:productId'
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    const {productId} = req.params

    await Product.destroy({where: {id: productId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
