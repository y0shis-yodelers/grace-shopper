const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const router = require('express').Router()

const sample = [
  {
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Stubborn Attachments',
        images: ['https://i.imgur.com/EHyR2nP.png']
      },
      unit_amount: 2000
    },
    quantity: 1
  }
]

router.post('/create-checkout-session', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: sample,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    })
    res.json({id: session.id})
  } catch (error) {
    next(error)
  }
})

module.exports = router
