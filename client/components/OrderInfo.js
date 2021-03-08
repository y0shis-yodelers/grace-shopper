import React from 'react'
import {formatPrice} from './helperFunctions'

const totals = ({products}) => {
  let totalQuantity = 0,
    totalPrice = 0

  products.forEach(product => {
    totalQuantity += product.ProductOrder.quantity
    totalPrice += product.ProductOrder.pricePaid
  })

  return {totalQuantity, totalPrice}
}

const OrderInfo = products => {
  const {totalQuantity, totalPrice} = totals(products)

  return (
    <div className="cartContainer">
      <div>Total Quantity: {totalQuantity}</div>
      <div>Total Price: {formatPrice(totalPrice)}</div>
    </div>
  )
}

export default OrderInfo
