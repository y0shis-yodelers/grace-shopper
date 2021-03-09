import React from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {fetchAllProducts} from '../store/products'
import {fetchLoadCart, fetchUpdateCart} from '../store/cart'
import ProductCard from './ProductCard'
import Cart from './Cart'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.updateQuantity = this.updateQuantity.bind(this)
  }

  updateQuantity(productId, quantity) {
    this.props.updateCart(this.props.user.id, productId, quantity)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id)
      this.props.getCart(this.props.user.id)
  }

  render() {
    const products = this.props.products || []
    const cart = this.props.cart || []
    const {updateQuantity} = this

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
                <ProductCard
                  key={product.id}
                  product={product}
                  // check if product is associated with
                  // an order -- if not, display 0 quantity
                  quantity={
                    product && product.ProductOrder
                      ? product.ProductOrder.quantity
                      : 0
                  }
                  updateQuantity={updateQuantity}
                />
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
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts()),

  getCart: userId => dispatch(fetchLoadCart(userId)),

  updateCart: (userId, productId, quantity) =>
    dispatch(fetchUpdateCart(userId, productId, quantity))
})

export default connect(mapState, mapDispatch)(AllProducts)
