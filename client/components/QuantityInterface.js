import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdateCart} from '../store/cart'

const QuantityInterface = ({
  quantity,
  setQuantity,
  userId,
  productId,
  inventory,
  updateQuantity
}) => {
  return (
    <div className="quantityAndBtns">
      <button
        type="button"
        onClick={() => {
          // if quantity is 0, disallow further quantity decreases
          if (quantity === 0) return
          const newQuantity = quantity - 1
          setQuantity(newQuantity)
          updateQuantity(userId, productId, newQuantity)
        }}
      >
        -
      </button>
      <div className="productQuantity">{quantity}</div>
      <button
        type="button"
        onClick={() => {
          // if quantity requested exceeds inventory
          // disallow further quantity increases
          if (quantity === inventory) return
          const newQuantity = quantity + 1
          setQuantity(newQuantity)
          updateQuantity(userId, productId, newQuantity)
        }}
      >
        +
      </button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  updateQuantity: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity))
})

export default connect(null, mapDispatch)(QuantityInterface)
