import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import ProductCard from './ProductCard'
import Cart from './Cart'
import {fetchMergePastAndGuestCarts} from '../store/cart'

// imperative reduceCart
// takes in an orders array
// and outputs a cart: { productId : quantity ... }
const reduceOrdersToGetPastCart = order => {
  let res = {}
  const {products} = order
  console.log(products)
  products.forEach(product => {
    const cartItem = {
      [product.ProductOrder.productId]: product.ProductOrder.quantity
    }
    res = {...res, ...cartItem}
  })
  return res
}

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      const unfulfilledOrder = this.props.user.orders.filter(
        order => !order.date
      )[0]
      const pastCart = reduceOrdersToGetPastCart(unfulfilledOrder)
      this.props.loadCart(pastCart)
    }
  }

  render() {
    const products = this.props.products || []

    return (
      <div>
        {!products[0] ? (
          <div>Loading ...</div>
        ) : (
          <div className="productsAndCart">
            <div className="allProductContainer">
              {products.map(product => (
                <Link
                  key={product.id}
                  className="productLink"
                  to={`/products/${product.id}`}
                >
                  <ProductCard product={product} />
                </Link>
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
  getProducts: () => dispatch(fetchAllProducts()),
  loadCart: pastCart => {
    /* here, we load a potential cart from localStorage
      so that guest users and users alike can persist an unfulfilled order -- if cart does not exist on localStorage the call returns null, so we check its truthiness and set it equal to an empty object if there is no cart! */

    let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {}
    dispatch(fetchMergePastAndGuestCarts(pastCart, cartFromLocalStorage))
  }
})

export default connect(mapState, mapDispatch)(AllProducts)
