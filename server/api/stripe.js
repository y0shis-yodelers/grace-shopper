/* eslint-disable camelcase */

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const router = require('express').Router()
const {Order, Product} = require('../db/models')
const sendEmail = require('./email')

//generate stripe format for cart
const generateStripeCart = (cart, products) => {
  //let cartWithProduct = products.filter((product) => cart[product.id])
  return products.map(product => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.imageUrl]
        },
        unit_amount: product.price
      },
      quantity: cart[product.id]
    }
  })
}

router.post('/create-checkout-session', async (req, res, next) => {
  const stripeCart = generateStripeCart(req.body.cart, req.body.products)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: stripeCart,
    mode: 'payment',
    success_url: 'http://localhost:8080/success',
    cancel_url: 'http://localhost:8080/failure'
  })
  //await axios.post('api/stripe/success', req.body.cart)
  res.json({id: session.id})
})

router.post('/success', async (req, res, next) => {
  const ordered = req.body.cart.products
  const cartId = req.body.cart.id
  const user = req.body.user

  console.log('red', user)
  console.log('blue', req.body.products)
  //remove from inventory
  ordered.forEach(async product => {
    try {
      await Product.update(
        {inventory: product.inventory - product.ProductOrder.quantity},
        {where: {id: product.id}, returning: true}
      )
    } catch (err) {
      console.log(err)
    }
  })

  // update order to completed
  try {
    await Order.update({isPaid: true}, {where: {id: cartId}})
  } catch (err) {
    console.log(err)
  }
  //5 seconds on confirmation page
  //send email via nodemailer
  sendEmail(user.email, cartId)
  //send sms via twilio
  //redirect to homepage
  res.sendStatus(500)
})

module.exports = router
