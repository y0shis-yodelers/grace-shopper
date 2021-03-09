import React from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {formatPrice} from './helperFunctions'
import {fetchUpdateCart} from '../store/cart'

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity || 0
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  handleQuantityChange(newQuantity) {
    this.setState({
      quantity: newQuantity
    })
  }

  render() {
    const {handleQuantityChange} = this
    const {quantity} = this.state
    const {userId, product, updateQuantity} = this.props
    const {name, imageUrl, price, inventory} = product || {}

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
              <img src={imageUrl} />
              <div className="nameAndPrice">
                <div className="productName">{name}</div>
                <div className="productPrice">
                  {formatPrice(price.toString())}
                </div>
              </div>
              <div className="productInventory">
                {inventory > 0
                  ? `In-stock: ${inventory} items remaining`
                  : 'Sold out'}
              </div>
            </div>
            <div className="quantityAndBtns">
              <button
                type="button"
                onClick={() => {
                  // if quantity is 0, disallow further quantity decreases
                  if (quantity === 0) return
                  const newQuantity = quantity - 1
                  handleQuantityChange(newQuantity)
                  updateQuantity(userId, product.id, newQuantity)
                }}
              >
                -
              </button>
              <div className="productQuantity">{quantity}</div>
              <button
                type="button"
                onClick={() => {
                  // if quantity requested exceeds inventory
                  // disallow further quantity increases
                  if (quantity === inventory) return
                  const newQuantity = quantity + 1
                  handleQuantityChange(newQuantity)
                  updateQuantity(userId, product.id, newQuantity)
                }}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  updateQuantity: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity))
})

export default connect(mapState, mapDispatch)(ProductCard)
