import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchClearCart, fetchCompleteOrder} from '../store/cart'
import {fetchAllProducts} from '../store/products'

class OrderSuccess extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    // let cartWithProduct = this.props.products.filter(
    //   (product) => this.props.cart[product.id]
    // )
    // console.log(cartWithProduct)
    console.log('products', this.props.products)
    console.log('cart', this.props.cart)
    console.log('user', this.props.user)

    this.props.completeOrder(this.props.user.id)

    return (
      <div>
        <h4>Thanks {this.props.user.name}!</h4>
        <h6>
          You should expect an email at {this.props.user.email} and SMS at{' '}
          {this.props.user.phoneNumber}
        </h6>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    emptyCart: userId => dispatch(fetchClearCart(userId)),
    completeOrder: userId => dispatch(fetchCompleteOrder(userId)),
    getProducts: () => dispatch(fetchAllProducts())
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart,
  products: state.products
})

export default connect(mapState, mapDispatch)(OrderSuccess)

export const OrderFailure = () => {
  return (
    <div>
      <h4>Your Order did not go through</h4>
      <h6>Please try again and/or contact customer service</h6>
    </div>
  )
}
