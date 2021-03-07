import React from 'react'
import {formatPrice} from './helperFunctions'

const OrderCard = ({order}) => {
  return (
    <div className="orderContainer">
      <img src={order.products[0].imageUrl} />
      <div className="orderName">{order.products[0].name}</div>
      <div>Quantity: {order.products[0].ProductOrder.quantity}</div>
      <div>Price: {formatPrice(order.products[0].ProductOrder.pricePaid)}</div>
    </div>
  )
}

export default OrderCard
