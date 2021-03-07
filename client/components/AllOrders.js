import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/orders'

class AllOrders extends React.Component {
  componentDidMount() {
    const {id} = this.props.user

    this.props.getOrders(id)
  }

  render() {
    const {orders} = this.props

    return (
      <div className="userOrdersContainer">
        {orders.length ? (
          orders.map(order => (
            <div key={order.id}>
              <div>
                {orders.length ? (
                  <div className="orderContainer">
                    <img src={order.products[0].imageUrl} />
                    <div className="orderName">{order.products[0].name}</div>
                    <div>{order.products[0].pricePaid}</div>
                    <div>{order.products[0].quantity}</div>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
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
