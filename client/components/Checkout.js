import React from 'react'
import {Total, ShippingData} from '../components'

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
    )
  }
}

export default Checkout
