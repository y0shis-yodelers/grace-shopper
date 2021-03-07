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
const reduceOrdersToGetPastCart = (order = {products: []}) => {
  let res = {}
  const {products} = order

  // if no products, return empty object ( {} )
  if (!products.length) return {}

  products.forEach(product => {
    const cartItem = {
      [product.ProductOrder.productId]: product.ProductOrder.quantity
    }
    res = {...res, ...cartItem}
  })
  return res
}

class AllProducts extends React.Component {
  getUserCart() {
    const unfulfilledOrder = this.props.user.orders.filter(
      order => !order.date
    )[0]
    const pastCart = reduceOrdersToGetPastCart(unfulfilledOrder)
    this.props.loadCart(pastCart)
  }

  componentDidMount() {
    this.props.getProducts()

    // if we're coming directly from logging in
    // we WILL have access to user.id in componentDidMount
    // so we need to make the same call to getUserCart()
    if (this.props.user.id) this.getUserCart()

    // here we call loadCart with no pastCart
    // so that if user is NOT logged in
    // they still get their guest cart from localStorage
    this.props.loadCart({})
  }

  // user is not available in componentDidMount
  // so we load the user's pastCart, which is an unfulfilledOrder
  // here in componentDidMount
  // and merge it in the redux store with this.props.loadCart
  // which dispatches the merge pastCart and guestCart
  // where guestCart is localStorage.getItem('cart') || {}

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) this.getUserCart()
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
    // here, we load a potential cart from localStorage
    // so that guest users and users alike can persist an unfulfilled order
    // -- if cart does not exist on localStorage the call returns null,
    // so we check its truthiness and set it equal to an empty object
    // if there is no cart!

    let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {}
    dispatch(fetchMergePastAndGuestCarts(pastCart, cartFromLocalStorage))
  }
})

export default connect(mapState, mapDispatch)(AllProducts)
