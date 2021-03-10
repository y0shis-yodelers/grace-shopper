import React from 'react'
import {formatPrice, totals} from './helperFunctions'

const OrderInfo = ({products, orderDate, orderId}) => {
  const {totalQuantity, totalPrice} = totals(products)

  const dateString = new Date(orderDate).toLocaleDateString()

  return (
    <div>
      <div className="orderInfoHeader">
        <span>Order Information:</span>
        <span>
          #BS-{orderId}-{new Date(orderDate).getUTCFullYear()}
        </span>
      </div>
      <div className="singleOrderContainer">
        <div className="orderInfoLineItem">
          <span>Date Of Purchase:</span>
          <span>{dateString}</span>
        </div>
        <div className="orderInfoLineItem">
          <span>Total Quantity:</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="orderInfoLineItem">
          <span>Total Price:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
