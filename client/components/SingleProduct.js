import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
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
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  handleChange() {
    // linter complains but this will work fine
    let newQuantity = this.state.quantity

    newQuantity++
    this.setState({
      quantity: newQuantity
    })
  }

  handleClick() {
    const productId = this.props.product.id
    this.props.updateCart(productId, this.state.quantity)
  }

  render() {
    const {singleProduct} = this.props || {}
    const {handleChange, handleClick} = this

    return (
      <div>
        {singleProduct && !singleProduct.id ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <Link to="/home">
              <div className="backToAllProducts">Back to all products</div>
            </Link>
            <div className="sp-view-container">
              <div className="singleProductContainer">
                <div className="buyupContainer">buyups go here</div>
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
                      Price: {singleProduct.price}
                    </div>
                    <div className="quantityContainer">
                      <div className="quantityValueAndBtns">
                        <span onClick={handleChange}> + </span>
                        <div className="currentQuantity">
                          {this.state.quantity}
                        </div>
                        <span onClick={handleChange}> - </span>
                      </div>
                      <button
                        type="submit"
                        name="addItem"
                        onClick={handleClick}
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
