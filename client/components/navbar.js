import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'
import store from '../store'
import {fetchClearCart} from '../store/cart'

const Navbar = ({isLoggedIn}) => (
  <div>
    <h1>Guitar Picks Homepage</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a
            href="#"
            onClick={() => {
              store.dispatch(fetchClearCart())
              store.dispatch(logout())
            }}
          >
            Logout
          </a>
          <Link to="/cart">Cart</Link>
          <Link to="/users/:userId">Profile</Link>
          <Link to="/users">Users</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/cart">Cart</Link>
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

export default connect(mapState)(Navbar)
