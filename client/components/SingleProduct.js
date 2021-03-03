import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  render() {
    // restore this when db functional
    // const {singleProduct} = this.props || {}

    const singleProduct = {
      name: 'pygmalion',
      price: '7.00',
      inventory: '6',
      imageUrl: 'https://imgur.com/YkxLjEt.jpg',
      description:
        'The right guitar pick can make you sound like Pearl Jam any day of the week! This silver plated drop guitar pick with a pearl setting, bring a hint of luxury to your gig and draw attention with every flick of your wrist.'
    }

    console.log(singleProduct)

    return (
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
                <div className="productPrice">Price: {singleProduct.price}</div>
                <div className="quantityContainer">
                  <span>Quantity</span>
                  <button type="button" name="addItem">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="cartContainer">cart goes here</div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => ({
  getSingleProduct: productId => dispatch(fetchSingleProduct(productId))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
