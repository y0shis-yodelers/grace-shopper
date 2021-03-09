import React from 'react'
import {formatPrice} from './helperFunctions'

const Total = ({products, cart}) => {
  let cartWithProduct = products.filter(product => cart[product.id])
  let subtotal = cartWithProduct.reduce((acc, curr) => {
    return curr.price * cart[curr.id] + acc
  }, 0)
  let tax = subtotal * 0.1
  let grandTotal = subtotal //+ tax
  return (
    <div className="totalsContainer">
      <div className="totalsLineItem">
        <span>Subtotal: </span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {/* <div>Tax: {formatPrice(tax)}</div> */}
      <div className="totalsLineItem">
        <span>Shipping:</span>
        <span>Free for members!</span>
      </div>
      <div className="totalsLineItem">
        <span>Grand Total:</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>
    </div>
  )
}

export default Total
