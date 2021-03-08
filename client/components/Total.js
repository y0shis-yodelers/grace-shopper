import React from 'react'
import {formatPrice} from './helperFunctions'

const Total = ({cart}) => {
  let subtotal = cart.reduce((acc, curr) => {
    return curr.price * curr.ProductOrder.quantity + acc
  }, 0)

  let tax = subtotal * 0.1

  let grandTotal = subtotal //+ tax

  return (
    <div className="totalContainer">
      <div>Subtotal: {formatPrice(subtotal)}</div>
      <div>Tax: {formatPrice(tax)}</div>
      <div>Shipping: Free for members!</div>
      <div>Grand Total: {formatPrice(grandTotal)}</div>
    </div>
  )
}

export default Total
