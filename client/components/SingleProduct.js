import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatPrice, getQuantityFromCart} from './helperFunctions'
import {fetchUpdateCart} from '../store/cart'
import {fetchAllProducts} from '../store/products'
import {fetchSingleProduct} from '../store/singleProduct'
import Cart from './Cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: getQuantityFromCart(this.props.match.params.productId)
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdateCart = this.handleUpdateCart.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
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

  handleUpdateCart() {
    const userId = this.props.user.id || 0
    const productId = this.props.singleProduct.id
    this.props.updateCart(userId, productId, this.state.quantity)
  }

  render() {
    const {singleProduct} = this.props || {}
    const {handleChange, handleUpdateCart} = this

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
                    <div className="quantityValueAndBtns">
                      <button
                        type="button"
                        onClick={() =>
                          handleChange('subtract', singleProduct.inventory)
                        }
                      >
                        -
                      </button>
                      <div className="currentQuantity">
                        {this.state.quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleChange('add', singleProduct.inventory)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="submit"
                      name="addItem"
                      onClick={handleUpdateCart}
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
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts()),
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
  updateCart: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
