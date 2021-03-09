import {loadStripe} from '@stripe/stripe-js'

const STRIPE_PUBLIC_KEY =
  'pk_test_51IRAGrKvkOozTd9WXjudcSnBXHoLITwEcGCrPGGRo4J7T2eYAnoREEYKFDNhMyC1HkrUAcXtMC37AMKUOl678a5A00sAd1ES3S'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

export default stripePromise

/*

checkout button procedure for stripe

async handleClick() {
    const stripe = await stripePromise
    const response = await axios.post('api/stripe/create-checkout-session', {
      cart: this.props.cart,
      products: this.props.products.filter(
        product => this.props.cart[product.id]
      )
    })
    const session = response.data
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log(result.error)
    }

*/
