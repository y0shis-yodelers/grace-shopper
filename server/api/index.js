const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/addresses', require('./addresses'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/stripe', require('./stripeV2'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
