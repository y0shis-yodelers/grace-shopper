//   async function handleCheckout() {
//     const stripe = await stripePromise
//     const response = await axios.post('api/stripe/create-checkout-session', {
//       cart: this.props.cart,
//       products: this.props.products,
//     })
//     const session = response.data
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     })

//     if (result.error) console.log(result.error)
//   }

//   import stripePromise from '../store/checkoutOptions/stripe'
// import axios from 'axios'
