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
    const {singleProduct} = this.props || {}

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
        )}
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
