import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({isLoggedIn, cart, logoutAndSetLocalStorageCart}) => (
  <div>
    <h1>Guitar Picks Homepage</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={() => logoutAndSetLocalStorageCart(cart)}>
            Logout
          </a>
          <Link to="/checkout">Checkout</Link>
          <Link to="/users/:userId">Profile</Link>
          <Link to="/users">Users</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  // here we define a logout procedure
  // that also sets the localStorage cart instance
  // to the redux store current state on logout
  // allowing us to persist the user cart
  // on logout on the same local machine

  logoutAndSetLocalStorageCart: cartFromStore => {
    localStorage.setItem('cart', JSON.stringify(cartFromStore))
    dispatch(logout())
  }
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  logoutAndSetLocalStorageCart: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
