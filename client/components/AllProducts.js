import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/products'

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

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchAllProducts()),
})

export default connect(null, mapDispatch)(AllProducts)
