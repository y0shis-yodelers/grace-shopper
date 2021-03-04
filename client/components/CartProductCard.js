import React from 'react'

const CartProductCard = ({product}) => {
  return (
    <div>
      <div className="cartProductContainer">
        <img src={product.imageUrl} />
        <div className="productName">{product.name}</div>
        <button type="button" name="addQnty">
          +
        </button>
        <button type="button" name="removeQnty">
          -
        </button>
        <div className="productQnty">{product.quantity}</div>
        <div className="productPrice">{product.price}</div>
      </div>
    </div>
  )
}

export default CartProductCard
