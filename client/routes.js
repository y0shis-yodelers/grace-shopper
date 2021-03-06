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
import {fetchSetUserOrGuestCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()

    // load cart after userId available
    this.props.loadCart(this.props.user.id)
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
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadCart(userId) {
      dispatch(fetchSetUserOrGuestCart(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
