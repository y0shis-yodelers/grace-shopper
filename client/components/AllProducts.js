import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import ProductCard from './ProductCard'
import Cart from './Cart'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products || []

    return (
      <div>
        {!products[0] ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <div className="allProductContainer">
              {products.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} />
                  <Link className="productLink" to={`/products/${product.id}`}>
                    Go to {product.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className=".cartContainer">
              <Cart />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
