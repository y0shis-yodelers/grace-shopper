import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import Total from './Total'

class CartSidebar extends React.Component {
  render() {
    const products = this.props.cart || []
    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <CartProductCard product={product} />
          </div>
        ))}
        <Total products={products} />
        <button type="button" name="submit">
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState, null)(CartSidebar)
