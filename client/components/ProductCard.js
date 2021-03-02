import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class ProductCard extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.productId)
  }

  render() {
    const {product} = this.props.singleProduct
    return (
      <div>
        <div className="productContainer">
          <img src={product.imageUrl} />
          <div className="productName">{product.name}</div>
          <div className="productPrice">{product.price}</div>
          <div className="productInventory">
            Only {product.inventory} left in stock!
          </div>
          <p className="productDescription">{product.description}</p>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleProduct: state.singleProduct,
})

const mapDispatch = (dispatch) => ({
  getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
})

export default connect(mapState, mapDispatch)(ProductCard)
