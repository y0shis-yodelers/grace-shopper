import React from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {formatPrice, getQuantityFromCart} from './helperFunctions'
import {fetchUpdateCart, fetchMergePastAndGuestCarts} from '../store/cart'

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.product.id
        ? getQuantityFromCart(this.props.product.id)
        : 0
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleUpdateCart = this.handleUpdateCart.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.getCart()
    }
  }

  handleQuantityChange(addOrSubtract, inventory) {
    // linter complains but this will work fine
    let newQuantity = this.state.quantity

    // add btn disabled if newQuantity exceeds available inventory
    if (addOrSubtract === 'add') {
      if (newQuantity === inventory) return
      ++newQuantity
    }

    // add btn disabled if newQuantity dips below 0
    if (addOrSubtract === 'subtract') {
      if (newQuantity === 0) return
      --newQuantity
    }

    // update local state
    this.setState({
      quantity: newQuantity
    })
  }

  handleUpdateCart() {
    const userId = this.props.user.id || 0
    const productId = this.props.product.id
    this.props.updateCart(userId, productId, this.state.quantity)
  }

  render() {
    const {product} = this.props || {}
    const {handleQuantityChange, handleUpdateCart} = this

    return (
      <div>
        {product && !product.id ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          <div>
            <div className="productContainer">
              <img src={product.imageUrl} />
              <div className="nameAndPrice">
                <div className="productName">{product.name}</div>
                <div className="productPrice">
                  {formatPrice(product.price.toString())}
                </div>
              </div>
              <div className="productInventory">
                {product.inventory > 0
                  ? `In-stock: ${product.inventory} items remaining`
                  : 'Sold out'}
              </div>
            </div>
            <div className="quant-view-prod-container">
              <div className="quantityAndBtns">
                <button
                  type="button"
                  onClick={async () => {
                    // if quantity is 0, disallow further quantity decreases
                    if (this.state.quantity === 0) return
                    const newQuantity = --this.state.quantity
                    await handleQuantityChange(product.id, newQuantity)
                    await handleUpdateCart()
                  }}
                >
                  -
                </button>
                <div className="productQuantity">{this.state.quantity}</div>
                <button
                  type="button"
                  onClick={async () => {
                    // if quantity requested exceeds inventory
                    // disallow further quantity increases
                    if (this.state.quantity === product.inventory) return
                    const newQuantity = ++this.state.quantity
                    await handleQuantityChange(product.id, newQuantity)
                    await handleUpdateCart()
                  }}
                >
                  +
                </button>
              </div>
              <Link className="productLink" to={`/products/${product.id}`}>
                view product
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: pastCart => {
    const guestCart = JSON.parse(localStorage.getItem('cart'))
    dispatch(fetchMergePastAndGuestCarts(pastCart, guestCart))
  },
  updateCart: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity))
})

export default connect(mapState, mapDispatch)(ProductCard)

/* const ProductCard = ({product}) => {
  return (
    <div>
      {product && !product.id ? (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <div>
          <div className="productContainer">
            <img src={product.imageUrl} />
            <div className="nameAndPrice">
              <div className="productName">{product.name}</div>
              <div className="productPrice">
                {formatPrice(product.price.toString())}
              </div>
            </div>
            <div className="productInventory">
              {product.inventory > 0
                ? `In-stock: ${product.inventory} items remaining`
                : 'Sold out'}
            </div>
          </div>
          <div className="quantityAndBtns">
            <button
              type="button"
              onClick={async () => {
                // if quantity is 0, disallow further quantity decreases
                if (quantity === 0) return
                const newQuantity = --quantity
                await handleQuantityChange(product.id, newQuantity)
              }}
            >
              -
            </button>
            <div className="productQuantity">{quantity}</div>
            <button
              type="button"
              onClick={async () => {
                // if quantity requested exceeds inventory
                // disallow further quantity increases
                if (quantity === product.inventory) return
                const newQuantity = ++quantity
                await handleQuantityChange(product.id, newQuantity)
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  )
} */

/* export default ProductCard */
