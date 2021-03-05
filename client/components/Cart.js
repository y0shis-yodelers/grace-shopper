import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import {fetchUpdateCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  async handleQuantityChange(productId, quantity) {
    await this.props.updateCart(productId, quantity)
  }

  render() {
    const cart = this.props.cart || {}
    const products = this.props.products || []
    const {handleQuantityChange} = this

    return (
      <div>
        {products.map(product => {
          // if the cart doesn't hold this item
          // jump out of map fn, so that we don't
          // generate CartProductCards for items
          // that aren't in our cart
          if (!cart[product.id]) return
          return (
            <div key={product.id}>
              <CartProductCard
                product={product}
                handleQuantityChange={handleQuantityChange}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => ({
  updateCart: (productId, quantity) =>
    dispatch(fetchUpdateCart(productId, quantity))
})

export default connect(mapState, mapDispatch)(Cart)
