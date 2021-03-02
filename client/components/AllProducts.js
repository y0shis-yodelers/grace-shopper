import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/products'
import ProductCard from './ProductCard'

const AllProducts = ({products}) => {
  return (
    <div>
      <div className="container">
        {products.map((product) => (
          <ProductCard key={product.id} />
        ))}
      </div>
    </div>
  )
}

const mapState = (state) => ({
  products: state.products,
})

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchAllProducts()),
})

export default connect(null, mapDispatch)(AllProducts)
