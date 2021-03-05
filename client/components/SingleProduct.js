import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {formatPrice} from './helperFunctions'
import {fetchUpdateCart} from '../store/cart'
import {fetchSingleProduct} from '../store/singleProduct'
import Cart from './Cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdateCart = this.handleUpdateCart.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  handleChange(addOrSubtract) {
    // linter complains but this will work fine
    let newQuantity = this.state.quantity

    // check if state.quantity is 0
    // if not 'add', jump out without setState call
    if (addOrSubtract === 'add') {
      ++newQuantity
    } else {
      if (newQuantity === 0) return
      --newQuantity
    }

    this.setState({
      quantity: newQuantity
    })
  }

  handleUpdateCart() {
    const productId = this.props.singleProduct.id
    this.props.updateCart(productId, this.state.quantity)
  }

  render() {
    const {singleProduct} = this.props || {}
    const {handleChange, handleUpdateCart} = this

    return (
      <div>
        {singleProduct && !singleProduct.id ? (
          <div>Loading ...</div>
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
                      <span onClick={() => handleChange('subtract')}> - </span>
                      <div className="currentQuantity">
                        {this.state.quantity}
                      </div>
                      <span onClick={() => handleChange('add')}> + </span>
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
            <div className="cartContainer">
              <Cart />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => ({
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
  updateCart: (productId, quantity) =>
    dispatch(fetchUpdateCart(productId, quantity))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
