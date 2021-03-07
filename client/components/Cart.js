import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import {fetchUpdateCart, fetchClearCart} from '../store/cart'
import Total from './Total'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleClearCart = this.handleClearCart.bind(this)
  }

  async handleQuantityChange(productId, quantity) {
    await this.props.updateCart(productId, quantity)
  }

  async handleClearCart() {
    // clearCart only clears cart for local session
    // if user does not log out, we assume user
    // didn't necessarily want to have a fully-cleared cart
    // persisted in the database!
    // so cart will be cleared and persisted as cleared
    // only if user logs out WITH a cleared cart
    const orders = this.props.user.orders || []
    let orderId
    if (orders.length) {
      const unfulfilledOrder = orders.filter(order => !order.date)[0]
      orderId = unfulfilledOrder.id
    }
    if (orderId) await this.props.clearCart(orderId)
  }

  render() {
    const cart = this.props.cart || {}
    const products = this.props.products || []
    const {handleQuantityChange, handleClearCart} = this

    console.log(products)

    return (
      <div className="cartContainer">
        <div className="myCartAndClearCartBtn">
          <div className="cartTitle">My Cart:</div>
          <button className="clearCart" type="button" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
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
          <Total products={products} cart={cart} />
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
  updateCart: (productId, quantity) =>
    dispatch(fetchUpdateCart(productId, quantity)),
  clearCart: orderId => dispatch(fetchClearCart(orderId))
})

export default connect(mapState, mapDispatch)(Cart)
