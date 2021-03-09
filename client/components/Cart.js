import React from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import Total from './Total'

const Cart = ({cart}) => {
  console.log('cart is, ', cart)

  return (
    <div className="cartContainer">
      {!cart || (cart && !cart.length) ? (
        <div>...Loading</div>
      ) : (
        <div>
          <Total cart={cart} />
          <div className="cartBox">
            {cart.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={product.ProductOrder.quantity || 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(Cart)
