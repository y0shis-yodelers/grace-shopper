import React from 'react'
import {connect} from 'react-redux'
import {fetchCompleteOrder} from '../store/cart'

class OrderSuccess extends React.Component {
  componentDidUpdate() {
    console.log('user from cdm', this.props.user)
    this.props.completeOrder(this.props.user.id)
  }

  render() {
    console.log('user', this.props.user)

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
  user: state.user
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
