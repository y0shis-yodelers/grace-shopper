import React from 'react'

const OrderCard = ({order}) => {
  return (
    <div>
      {order && !order.id ? (
        <div>Loading...</div>
      ) : (
        <div className="orderContainer">
          <img src={order.imageUrl} />
          <div className="orderName">{order.name}</div>
          <div>{order.pricePaid}</div>
          <div>{order.quantity}</div>
        </div>
      )}
    </div>
  )
}

export default OrderCard
