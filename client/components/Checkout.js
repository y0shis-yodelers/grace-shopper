import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart'
import ShippingData from './ShippingData'
import stripePromise from '../store/checkoutOptions/stripe'
import axios from 'axios'
import {fetchLoadCart} from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id)
      this.props.getCart(this.props.user.id)
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
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: userId => dispatch(fetchLoadCart(userId))
})

export default connect(mapState, mapDispatch)(Checkout)
