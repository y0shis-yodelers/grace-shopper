/* eslint-disable camelcase */

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const router = require('express').Router()

//generate stripe format for cart
const generateStripeCart = (cart, products) => {
  let cartWithProduct = products.filter((product) => cart[product.id])
  return cartWithProduct.map((product) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount: product.price,
      },
      quantity: cart[product.id],
    }
  })
}

router.post('/create-checkout-session', async (req, res, next) => {
  const stripeCart = generateStripeCart(req.body.cart, req.body.products)

  console.log(stripeCart)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeCart,
    mode: 'payment',
    success_url: 'http://localhost:8080/success',
    cancel_url: 'http://localhost:8080/cancel',
  })
  res.json({id: session.id})
})

router.get('/sucess', async (req, res, next) => {
  //remove from inventory
})

module.exports = router
