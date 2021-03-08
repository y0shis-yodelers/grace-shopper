import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import Total from './Total'
import {fetchUpdateCart, fetchClearCart} from '../store/cart'
import stripePromise from '../store/checkoutOptions/stripe'
import axios from 'axios'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleQuantityChange(productId, quantity) {
    const userId = this.props.user.id || 0
    this.props.updateCart(userId, productId, quantity)
  }

  async handleCheckout() {
    const stripe = await stripePromise
    const response = await axios.post('api/stripe/create-checkout-session', {
      cart: this.props.cart,
      products: this.props.products.filter(
        product => this.props.cart[product.id]
      )
    })
    const session = response.data
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) console.log(result.error)
  }

  render() {
    const {cart} = this || {}
    const products = this.props.products || []
    const {handleQuantityChange, handleCheckout} = this

    console.log('this is cart in Cart, ', cart)

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
          {Object.values(cart).map(product => {
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

        <button type="button" className="checkoutBtn" onClick={handleCheckout}>
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
  loadCart: userId => dispatch(fetchLoadCart(userId)),
  updateCart: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity)),
  emptyCart: userId => dispatch(fetchClearCart(userId))
})

export default connect(mapState, mapDispatch)(Cart)
