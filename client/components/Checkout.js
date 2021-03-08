import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart'
import ShippingData from './ShippingData'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    console.log('Submitted')
    console.log(event.target.value)
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

const mapState = (state) => ({
  user: state.user,
})

export default connect(mapState)(Checkout)
