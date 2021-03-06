import React from 'react'
import {connect} from 'react-redux'
import CartProductCard from './CartProductCard'
import {fetchUpdateCart} from '../store/cart'
import {Total, Checkout, ShippingData} from '../components'

class FullPageCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  async handleQuantityChange(productId, quantity) {
    await this.props.updateCart(productId, quantity)
  }

  render() {
    const cart = this.props.cart || {}
    const products = this.props.products || []
    const {handleQuantityChange} = this
    //let cartWithProduct = products.filter((product) => cart[product.id])

    return (
      <div className="cartContainer">
        <div className="productsAndCk">
          <div className="cartTitle">My Cart:</div>
          <div className="cartBox">
            {products.map(product => {
              // if the cart doesn't hold this item
              // jump out of map fn, so that we don't
              // generate CartProductCards for items
              // that aren't in our cart
              if (!cart[product.id]) return

              // if cart does hold this item
              // extract its quantity and pass to CartProductCard
              const quantity = cart[product.id]

              return (
                <div key={product.id}>
                  <CartProductCard
                    product={product}
                    quantity={quantity}
                    handleQuantityChange={handleQuantityChange}
                  />
                </div>
              )
            })}
            <Total products={products} cart={cart} />
          </div>
          <Checkout />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => ({
  updateCart: (productId, quantity) =>
    dispatch(fetchUpdateCart(productId, quantity))
})

export default connect(mapState, mapDispatch)(FullPageCart)
