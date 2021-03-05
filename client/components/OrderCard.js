import React from 'react'

const OrderCard = ({order}) => {
  return (
    <div>
      {order && !order.id ? (
        <div>Loading...</div>
      ) : (
        <div className="orderContainer">
          <img src={order.imageUrl} />
          <div>{order.name}</div>
          <div>{order.pricePaid}</div>
          <div>{order.quantity}</div>
          <p>{order.description}</p>
        </div>
      )}
    </div>
  )
}

export default OrderCard
