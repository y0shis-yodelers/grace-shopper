import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
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

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
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

const mapState = state => ({
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
})

export default withRouter(connect(mapState, mapDispatch)(Routes))
