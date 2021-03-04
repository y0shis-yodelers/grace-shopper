import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'

class Cart extends React.Component {
  render() {
    const products = this.props.cart || []
    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <CartProductCard product={product} />
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState, null)(Cart)
