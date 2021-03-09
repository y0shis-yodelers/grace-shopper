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
    if (!prevProps.user.id && this.props.user.id) {
      this.props.getProducts()
      this.props.getCart(this.props.user.id)
    }
  }

  render() {
    const products = this.props.products || []

    // absolutely necessary
    let userProductOrders
    if (this.props.user.orders)
      userProductOrders = this.props.user.orders
        .filter(order => !order.date)[0]
        .products.map(product => product.ProductOrder)

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
              {products.map(product => {
                // absolutely necessary
                let PO
                if (userProductOrders)
                  PO = userProductOrders.filter(
                    productOrder => productOrder.productId === product.id
                  )[0]
                let quantity = 0
                if (PO) quantity = PO.quantity

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    productId={product.id}
                    quantity={quantity}
                    updateQuantity={updateQuantity}
                  />
                )
              })}
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
