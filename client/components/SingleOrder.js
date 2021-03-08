import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/singleOrder'

// const SingleOrder = ({order}) => {
//   return (
//     <div>
//       {order && !order.id ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="orderContainer">
//           <img src={order.imageUrl} />
//           <div className="orderName">{order.name}</div>
//           <div>{order.pricePaid}</div>
//           <div>{order.quantity}</div>
//         </div>
//       )}
//     </div>
//   )
// }

class SingleOrder extends React.Component {
  render() {
    return <div />
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
