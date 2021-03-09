import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'
import store from '../store'
import {fetchClearCart} from '../store/cart'

const Navbar = ({isLoggedIn, cart}) => {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
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
            <Link to="/checkout" className="checkoutAndBadge">
              <span>
                <span>
                  Checkout <span className="totalBadge">{totalItems}</span>
                </span>
              </span>
            </Link>
            <Link to="/users/:userId">Profile</Link>
            <Link to="/users">Users</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/checkout">Checkout {totalItems}</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id
})

export default connect(mapState)(Navbar)
