import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  AllProducts,
  SingleProduct,
  UserProfile,
  SingleOrder,
  Checkout,
  AllUsers
} from './components'
import {me} from './store'
import {fetchMergePastAndGuestCarts, fetchLoadCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    // if we're coming directly from logging in
    // we WILL have access to user.id in componentDidMount
    // so we need to make the same call to getUserCart()
    if (this.props.user.id) this.props.getUserCart(this.props.user.id)
    // here we call loadCart with no pastCart
    // so that if user is NOT logged in
    // they still get their guest cart from localStorage

    // this.props.mergeCart({})
  }

  // user is not immediately available in componentDidMount
  // if we're NOT coming directly from logging in
  // so we load the user's pastCart in componentDidUpdate
  componentDidUpdate(prevProps) {
    if (prevProps.user && !prevProps.user.id && this.props.user.id)
      this.props.getUserCart(this.props.user.id)
  }

  render() {
    return (
      <Switch>
        <Route path="/home" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkout" component={Checkout} />

        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/users/:userId/orders/:orderId" component={SingleOrder} />
        <Route path="/users/:userId" component={UserProfile} />
        <Route exact path="/users" component={AllUsers} />

        <Route component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getUserCart: userId => dispatch(fetchLoadCart(userId)),
  // load guestCart from localStorage and pass along with pastCart
  // to merge the two in the redux store
  mergeCart: pastCart => {
    let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {}
    dispatch(fetchMergePastAndGuestCarts(pastCart, cartFromLocalStorage))
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
}
