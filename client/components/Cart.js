import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import Total from './Total'
import Submit from './Submit'

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
        <Total />
        <Submit />
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState, null)(Cart)
