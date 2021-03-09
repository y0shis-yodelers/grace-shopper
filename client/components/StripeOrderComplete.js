import React from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class OrderSuccess extends React.Component {
  async componentDidMount() {
    await axios.post('api/stripe/success', this.props.cart)
  }
  render() {
    return (
      <div>
        <h4>
          Thank you {this.props.user.name} for ordering at the Bass Shopper
        </h4>
        <h6>
          You should expect an email at {this.props.user.email} and SMS at
          {this.props.user.phoneNumber}
        </h6>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})
export default connect(mapState, null)(OrderSuccess)

export const OrderFailure = () => {
  return (
    <div>
      <h4>Your Order did not go through</h4>
      <h6>Please try again and/or contact customer service</h6>
    </div>
  )
}
