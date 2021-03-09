import React from 'react'
import {formatPrice, totals} from './helperFunctions'

const OrderInfo = ({products}) => {
  const {totalQuantity, totalPrice} = totals(products)

  return (
    <div className="cartContainer">
      <div>Total Quantity: {totalQuantity}</div>
      <div>Total Price: {formatPrice(totalPrice)}</div>
    </div>
  )
}

export default OrderInfo
