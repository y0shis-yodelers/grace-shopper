import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
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
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          <div className="productsAndCart">
            <div className="allProductContainer">
              {products.map(product => (
                <div key={product.id}>
                  <ProductCard product={product} />
                  <Link className="productLink" to={`/products/${product.id}`}>
                    view product
                  </Link>
                </div>
              ))}
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
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
