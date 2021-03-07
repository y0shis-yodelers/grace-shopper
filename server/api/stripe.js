const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const router = require('express').Router()

router.post('/create-checkout-session', async (req, res, next) => {
  try {
    console.log('hello')
  } catch (error) {
    next(error)
  }
})

module.exports = router
