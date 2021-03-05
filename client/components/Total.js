import React from 'react'
import {formatPrice} from './helperFunctions'

const Total = ({products, cart}) => {
  let cartWithProduct = products.filter(product => cart[product.id])
  let subtotal = cartWithProduct.reduce((acc, curr) => {
    return curr.price * cart[curr.id] + acc
  }, 0)
  let tax = subtotal * 0.1
  let grandTotal = subtotal + tax
  return (
    <div>
      <div>Subtotal: {formatPrice(subtotal)}</div>
      <div>Tax: {formatPrice(tax)}</div>
      <div>Shipping: Free for members!</div>
      <div>Grand Total: {formatPrice(grandTotal)}</div>
    </div>
  )
}

export default Total
