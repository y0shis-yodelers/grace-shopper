import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart'
import ShippingData from './ShippingData'
import stripePromise from '../store/checkoutOptions/stripe'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const stripe = await stripePromise
    const response = await axios.post('api/stripe/create-checkout-session', {
      cart: this.props.cart
    })
    const session = response.data
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error) console.log(result.error)
  }

  render() {
    const {handleSubmit} = this
    return (
      <div className="checkout-view-container">
        <Cart />
        <div className="checkoutContainer">
          <div>This is the checkout sidebar</div>
          <ShippingData />
          <button
            type="button"
            className="checkoutBtn"
            onClick={handleSubmit}
            value={55}
          >
            Submit Order
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Checkout)
