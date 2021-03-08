import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import {fetchUpdateCart} from '../store/cart'
import {Total} from '../components'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'

const STRIPE_PUBLIC_KEY =
  'pk_test_51IRAGrKvkOozTd9WXjudcSnBXHoLITwEcGCrPGGRo4J7T2eYAnoREEYKFDNhMyC1HkrUAcXtMC37AMKUOl678a5A00sAd1ES3S'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

class FullPageCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleQuantityChange(productId, quantity) {
    await this.props.updateCart(productId, quantity)
  }

  async handleClick() {
    const stripe = await stripePromise
    const response = await axios.post('api/stripe/create-checkout-session', {
      cart: this.props.cart,
      products: this.props.products
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
  }

  render() {
    const cart = this.props.cart || {}
    const products = this.props.products || []
    const {handleQuantityChange, handleClick} = this
    //let cartWithProduct = products.filter((product) => cart[product.id])
    console.log('all products', products)
    return (
      <div className="cartContainer">
        <div className="productsAndCk">
          <div className="cartTitle">My Cart:</div>
          <div className="cartBox">
            {products.map(product => {
              // if the cart doesn't hold this item
              // jump out of map fn, so that we don't
              // generate CartProductCards for items
              // that aren't in our cart
              if (!cart[product.id]) return

              // if cart does hold this item
              // extract its quantity and pass to CartProductCard
              const quantity = cart[product.id]

              return (
                <div key={product.id}>
                  <CartProductCard
                    product={product}
                    quantity={quantity}
                    handleQuantityChange={handleQuantityChange}
                  />
                </div>
              )
            })}
            <Total products={products} cart={cart} />
          </div>
        </div>
        <button type="button" className="checkoutBtn" onClick={handleClick}>
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => ({
  updateCart: (productId, quantity) =>
    dispatch(fetchUpdateCart(productId, quantity))
})

export default connect(mapState, mapDispatch)(FullPageCart)
