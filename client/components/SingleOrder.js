import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/singleOrder'

class SingleOrder extends React.Component {
  render() {
    return <div>This is a test</div>
  }
}

const mapState = state => {
  return {
    order: state.singleOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(fetchOrder(userId, orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
