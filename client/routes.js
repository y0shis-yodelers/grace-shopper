import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  AllProducts,
  SingleProduct,
  UserProfile
} from './components'
import {me} from './store'
import {reduceOrdersToGetPastCart} from './components/helperFunctions'
import {fetchMergePastAndGuestCarts} from './store/cart'
import {fetchSaveCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  getUserCart() {
    const unfulfilledOrder = this.props.user.orders.filter(
      order => !order.date
    )[0]
    const pastCart = reduceOrdersToGetPastCart(unfulfilledOrder)
    this.props.loadCart(pastCart)
  }

  componentDidMount() {
    this.props.loadInitialData()
    // if we're coming directly from logging in
    // we WILL have access to user.id in componentDidMount
    // so we need to make the same call to getUserCart()
    if (this.props.user.id) this.getUserCart()

    // here we call loadCart with no pastCart
    // so that if user is NOT logged in
    // they still get their guest cart from localStorage
    this.props.loadCart({})
  }

  // user is not immediately available in componentDidMount
  // so we load the user's pastCart in componentDidUpdate
  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) this.getUserCart()
  }

  componentWillUnmount(cart, userId) {
    this.props.saveCart(cart, userId)
  }

  render() {
    return (
      <Switch>
        <Route path="/home" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/users/:userId" component={UserProfile} />

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

  // load guestCart from localStorage and pass along with pastCart
  // to merge the two in the redux store
  loadCart: pastCart => {
    let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {}
    dispatch(fetchMergePastAndGuestCarts(pastCart, cartFromLocalStorage))
  },

  saveCart: (cart, userId) => dispatch(fetchSaveCart(cart, userId))
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
}
