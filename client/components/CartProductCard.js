import React from 'react'

const CartProductCard = ({product, handleQuantityChange}) => {
  return (
    <div>
      <div className="cartProductContainer">
        <img src={product.imageUrl} />
        <div className="productName">{product.name}</div>
        <button type="button" name="addQnty" onClick={handleQuantityChange}>
          +
        </button>
        <div className="productQnty">{product.quantity}</div>
        <button type="button" name="removeQnty" onClick={handleQuantityChange}>
          -
        </button>
        <div className="productPrice">{product.price}</div>
      </div>
    </div>
  )
}

export default CartProductCard
