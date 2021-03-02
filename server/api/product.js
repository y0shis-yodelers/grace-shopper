const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

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
