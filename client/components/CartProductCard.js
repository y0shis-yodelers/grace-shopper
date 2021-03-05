import React, {useState} from 'react'

const CartProductCard = ({product, handleQuantityChange}) => {
  const [quantity, setQuantity] = useState(0)

  return (
    <div>
      <div className="cartProductContainer">
        <img src={product.imageUrl} />
        <div className="productName">{product.name}</div>
        <button
          type="button"
          onClick={async () => {
            // if quantity is 0, disallow further quantity decreases
            if (quantity === 0) return
            setQuantity(quantity - 1)
            await handleQuantityChange(product.id, quantity)
          }}
        >
          -
        </button>
        <div className="productQnty">{quantity}</div>
        <button
          type="button"
          onClick={async () => {
            // if quantity requested exceeds inventory
            // disallow further quantity increases
            if (quantity > product.inventory) return
            setQuantity(quantity + 1)
            await handleQuantityChange(product.id, quantity)
          }}
        >
          +
        </button>
        <div className="productPrice">{product.price}</div>
      </div>
    </div>
  )
}

export default CartProductCard
