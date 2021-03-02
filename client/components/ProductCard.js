import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class ProductCard extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.productId)
  }

  render() {
    return (
      <div>
        <div className="productContainer">
          {/* stuff here pertaining to item view */}
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
