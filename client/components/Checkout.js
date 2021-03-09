import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart'
import ShippingData from './ShippingData'
import {fetchAllProducts} from '../store/products'
import {fetchMergePastAndGuestCarts} from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getCart()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.getProducts()
      this.props.getCart()
    }
  }

  handleSubmit(event) {
    console.log('Submitted')
    console.log(event.target.value)
  }

  render() {
    const {handleSubmit} = this
    return (
      <div className="checkout-view-container">
        <Cart />
        <div className="checkoutContainer">
          <div>This is the checkout sidebar</div>
          <ShippingData />
          <button
            type="button"
            className="checkoutBtn"
            onClick={handleSubmit}
            value={55}
          >
            Submit Order
          </button>
        </div>
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
  getProducts: () => dispatch(fetchAllProducts()),
  getCart: pastCart => {
    const guestCart = JSON.parse(localStorage.getItem('cart'))
    dispatch(fetchMergePastAndGuestCarts(pastCart, guestCart))
  }
})

export default connect(mapState, mapDispatch)(Checkout)
