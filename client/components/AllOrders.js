import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/orders'

class AllOrders extends React.Component {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const {orders} = this.props

    return (
      <div className="userOrdersContainer">
        {orders.length ? (
          orders.map(order => <div key={order.id} />)
        ) : (
          <div>No orders!</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => dispatch(fetchAllOrders())
  }
}

export default connect(mapState, mapDispatch)(AllOrders)
