import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import ProductCard from './ProductCard'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props || []
    return (
      <div>
        <div className="container">
          {products.map((product) => (
            <Link to={`products/${product.id}`}>
              <ProductCard key={product.id} productId={product.id} />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  products: state.products,
})

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchAllProducts()),
})

export default connect(mapState, mapDispatch)(AllProducts)
