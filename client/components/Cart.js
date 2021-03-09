import React from 'react'
import ProductCard from './ProductCard'
import Total from './Total'

const Cart = ({cart}) => {
  return (
    <div className="cartContainer">
      <Total cart={cart} />
      <div className="cartBox">
        {cart.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={product.ProductOrder.quantity}
          />
        ))}
      </div>
    </div>
  )
}

export default Cart
