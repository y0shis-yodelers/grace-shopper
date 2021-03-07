import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllOrders} from '../store/orders'
import OrderCard from './OrderCard'

class AllOrders extends React.Component {
  componentDidMount() {
    const {id} = this.props.user

    this.props.getOrders(id)
  }

  render() {
    const {id} = this.props.user
    const {orders} = this.props

    return (
      <div className="userOrdersContainer">
        {orders.length ? (
          orders.map(order => (
            <div key={order.id}>
              {orders.length ? (
                <Link
                  className="orderLink"
                  to={`/users/${id}/orders/${order.id}`}
                >
                  <OrderCard order={order} />
                </Link>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          ))
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
    getOrders: userId => dispatch(fetchAllOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(AllOrders)
