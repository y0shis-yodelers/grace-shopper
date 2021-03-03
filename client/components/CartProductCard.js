import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/cart'

// temp db here
let prodIdCounter = 1
let products = require('../../script/seed/products-seed')
products.forEach(product => (product.id = ++prodIdCounter))
console.log(products)

class CartProductCard extends React.Component {
  render() {
    // restore this when db functional
    // const {product} = this.props.singleProduct

    // temp db
    const product = products.find(
      product => product.id === this.props.productId
    )

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
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  addToCart: productId => dispatch(fetchSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(CartProductCard)
