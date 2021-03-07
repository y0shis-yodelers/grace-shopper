import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import {fetchUpdateCart, fetchClearCart} from '../store/cart'
import Total from './Total'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  async handleQuantityChange(productId, quantity) {
    const userId = this.props.user.id || 0
    await this.props.updateCart(userId, productId, quantity)
  }

  render() {
    const cart = this.props.cart || {}
    const products = this.props.products || []
    const {handleQuantityChange} = this

    return (
      <div className="cartContainer">
        <div className="myCartAndClearCartBtn">
          <div className="cartTitle">My Cart:</div>
          <button
            className="clearCart"
            type="button"
            onClick={() => {
              localStorage.setItem('cart', JSON.stringify({}))
              this.props.emptyCart(this.props.user.id)
            }}
          >
            Clear Cart
          </button>
        </div>
        <Total products={products} cart={cart} />
        <div className="cartBox">
          {products.map(product => {
            // if the cart doesn't hold this item
            // jump out of map fn, so that we don't
            // generate CartProductCards for items
            // that aren't in our cart
            if (!cart[product.id]) return

            // if cart does hold this item
            // extract its quantity and pass to CartProductCard
            const quantity = cart[product.id]

            return (
              <div key={product.id}>
                <CartProductCard
                  product={product}
                  quantity={quantity}
                  handleQuantityChange={handleQuantityChange}
                />
              </div>
            )
          })}
        </div>

        <button type="button" className="checkoutBtn">
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => ({
  updateCart: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity)),
  emptyCart: userId => dispatch(fetchClearCart(userId))
})

export default connect(mapState, mapDispatch)(Cart)
