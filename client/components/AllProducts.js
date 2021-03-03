import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import ProductCard from './ProductCard'

// temp db here
let prodIdCounter = 1
let products = require('../../script/seed/products-seed')
products.forEach(product => (product.id = ++prodIdCounter))
console.log(products)

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    // restore this when db functional
    // const {products} = this.props || []

    return (
      <div>
        <div className="allProductContainer">
          {products.map(product => (
            <div key={product.id}>
              <ProductCard productId={product.id} />
              <Link className="productLink" to={`/products/${product.id}`}>
                Go to {product.name}
              </Link>
            </div>
          ))}
        </div>
        <div className=".cartContainer">{/* <Cart /> */}</div>
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
