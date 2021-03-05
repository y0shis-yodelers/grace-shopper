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
            <div className="nameAndPrice">
              <div className="productName">{product.name}</div>
              <div className="productPrice">
                {formatPrice(product.price.toString())}
              </div>
            </div>
            <div className="productInventory">
              {product.inventory > 0
                ? `In-stock: ${product.inventory} items remaining`
                : 'Sold out'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
