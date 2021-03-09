import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatPrice, getQuantityFromCart} from './helperFunctions'
import {fetchLoadCart, fetchUpdateCart} from '../store/cart'
import {fetchAllProducts} from '../store/products'
import {fetchSingleProduct} from '../store/singleProduct'
import Cart from './Cart'
import QuantityInterface from './QuantityInterface'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.setQuantity = this.setQuantity.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  async componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      await this.props.loadCart(this.props.user.id)
      this.setState({
        quantity: getQuantityFromCart(
          this.props.cart,
          this.props.singleProduct.id
        )
      })
    }
  }

  setQuantity(newQuantity) {
    this.setState({
      quantity: newQuantity
    })
  }

  handleChange(addOrSubtract, inventory) {
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

  updateQuantity() {
    const userId = this.props.user.id || 0
    const productId = this.props.singleProduct.id
    this.props.updateCart(userId, productId, this.state.quantity)
  }

  render() {
    const {singleProduct} = this.props || {}
    const {setQuantity, updateQuantity} = this

    return (
      <div>
        {singleProduct && !singleProduct.id ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          <div className="sp-view-container">
            <div className="singleProductContainer">
              <Link to="/home">
                <div className="backToAllProducts">Back to all products</div>
              </Link>
              <div className="imgAndDescription">
                <img src={singleProduct.imageUrl} />
                <div className="descriptionSidePanel">
                  <div className="productName">{singleProduct.name}</div>
                  <p className="singleProductDescription">
                    {singleProduct.description}
                  </p>
                  <div className="productInventory">
                    Available: {singleProduct.inventory}
                  </div>
                  <div className="productPrice">
                    Price: {formatPrice(singleProduct.price.toString())}
                  </div>
                  <div className="quantityContainer">
                    <QuantityInterface
                      quantity={this.state.quantity}
                      setQuantity={setQuantity}
                      userId={this.props.user.id}
                      productId={singleProduct.id}
                      inventory={singleProduct.inventory}
                      updateQuantity={updateQuantity}
                    />
                    <button
                      type="submit"
                      name="addItem"
                      onClick={updateQuantity}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Cart />
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart,
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts()),

  getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),

  loadCart: userId => dispatch(fetchLoadCart(userId)),

  updateCart: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
