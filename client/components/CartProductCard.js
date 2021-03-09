import React from 'react'
import {formatPrice} from './helperFunctions'

const CartProductCard = ({product, quantity, handleQuantityChange}) => {
  return (
    <div className="cartProductContainer">
      <img src={product.imageUrl} />
      <div className="cart-pc-inner-container">
        <div className="nameAndPrice">
          <div className="productName">{product.name}</div>
          <div className="productPrice">
            {formatPrice(product.price.toString())}
          </div>
        </div>
        <div className="quantityAndBtns">
          <button
            type="button"
            onClick={async () => {
              // if quantity is 0, disallow further quantity decreases
              if (quantity === 0) return
              const newQuantity = --quantity
              await handleQuantityChange(product.id, newQuantity)
            }}
          >
            -
          </button>
          <div className="productQuantity">{quantity}</div>
          <button
            type="button"
            onClick={async () => {
              // if quantity requested exceeds inventory
              // disallow further quantity increases
              if (quantity === product.inventory) return
              const newQuantity = ++quantity
              await handleQuantityChange(product.id, newQuantity)
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard
