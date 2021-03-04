import React from 'react'

const Total = ({products}) => {
  let subtotal = products.reduce((acc, curr) => {
    return curr.price + acc
  }, 0)
  let tax = subtotal * 0.1
  return (
    <div>
      <div>Subtotal: {subtotal}</div>
      <div>Tax: {tax}</div>
      <div>Shipping: Free for members!</div>
      <div>GrandTotal: {subtotal + tax}</div>
    </div>
  )
}

export default Total
