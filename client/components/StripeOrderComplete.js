import React from 'react'
import {connect} from 'react-redux'
import {fetchCompleteOrder} from '../store/cart'

class OrderSuccess extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.completeOrder(this.props.user)
    }
  }

  render() {
    return (
      <div>
        <h4>Thanks {this.props.user.name}!</h4>
        <h6>
          You should expect an email at {this.props.user.email} and SMS at{' '}
          {this.props.user.phoneNumber}
        </h6>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    completeOrder: userId => dispatch(fetchCompleteOrder(userId))
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})

export default connect(mapState, mapDispatch)(OrderSuccess)

export const OrderFailure = () => {
  return (
    <div>
      <h4>Your Order did not go through</h4>
      <h6>Please try again and/or contact customer service</h6>
    </div>
  )
}
