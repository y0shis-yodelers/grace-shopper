import React from 'react'
import {formatPrice} from './helperFunctions'

const ProductCard = ({product}) => {
  return (
    <div>
      {product && !product.id ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <div className="productContainer">
            <img src={product.imageUrl} />
            <div className="productName">{product.name}</div>
            <div className="productPrice">
              {formatPrice(product.price.toString())}
            </div>
            <div className="productInventory">
              Only {product.inventory} left in stock!
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
