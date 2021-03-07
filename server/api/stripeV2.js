const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const router = require('express').Router()

const sample = [
  {
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'seagull fodder',
        images: ['https://imgur.com/K4aociq.jpg']
      },
      unit_amount: 2000
    },
    quantity: 1
  },
  {
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'serenity 2',
        images: ['https://imgur.com/bSldLGC.jpg']
      },
      unit_amount: 100
    },
    quantity: 5
  }
]

router.post('/create-checkout-session', async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: sample,
    mode: 'payment',
    success_url: 'http://localhost:8080/success',
    cancel_url: 'http://localhost:8080/cancel'
  })
  res.json({id: session.id})
})

module.exports = router
