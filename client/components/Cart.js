import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import {fetchLoadCart, fetchUpdateCart, fetchClearCart} from '../store/cart'
import Total from './Total'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  handleQuantityChange(productId, quantity) {
    const userId = this.props.user.id
    this.props.updateCart(userId, productId, quantity)
  }

  render() {
    const user = this.props.user || {}
    const cart = this.props.cart || []
    const {emptyCart} = this.props
    const {handleQuantityChange} = this

    return (
      <div className="cartContainer">
        <div className="myCartAndClearCartBtn">
          <div className="cartTitle">My Cart:</div>
          <button
            className="clearCart"
            type="button"
            onClick={() => emptyCart(user.id)}
          >
            Clear Cart
          </button>
        </div>
        <Total cart={cart} />
        <div className="cartBox">
          {cart.map(product => (
            <div key={product.id}>
              <CartProductCard
                product={product}
                quantity={product.ProductOrder.quantity}
                handleQuantityChange={handleQuantityChange}
              />
            </div>
          ))}
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
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: userId => dispatch(fetchLoadCart(userId)),

  updateCart: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity)),

  emptyCart: userId => dispatch(fetchClearCart(userId))
})

export default connect(mapState, mapDispatch)(Cart)
