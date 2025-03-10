const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/addresses', require('./addresses'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/stripe', require('./stripe'))
router.use('/carts', require('./carts'))
router.use('/admin', require('./admin'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
