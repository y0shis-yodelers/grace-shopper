import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {Card, Button} from 'semantic-ui-react'

const ProductCard = ({product}) => {
  return (
    // <div>
    //   {product && !product.id ? (
    //     <div>Loading ...</div>
    //   ) : (
    //     <div>
    //       <div className="productContainer">
    //         <img src={product.imageUrl} />
    //         <div className="productName">{product.name}</div>
    //         <div className="productPrice">{product.price}</div>
    //         <div className="productInventory">
    //           Only {product.inventory} left in stock!
    //         </div>
    //         <p className="productDescription">{product.description}</p>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <Card
      image={product.imageUrl}
      header={product.name}
      meta={product.price}
      description={product.description}
    />
  )
}

export default ProductCard
