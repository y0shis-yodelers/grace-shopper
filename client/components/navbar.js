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
      <Link to="/home">
        <img className="logo" src="https://i.imgur.com/wj50jx5.png" />
      </Link>
      <nav>
        {isLoggedIn ? (
          <div className="nav-link-container">
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
            <Link to="/users/:userId">Profile</Link>
            <Link to="/users">Users</Link>
            <a className="cartAndBadge" href="">
              <div
                className={
                  totalItems === 0 ? 'totalBadge hidden' : 'totalBadge'
                }
              >
                <span>{totalItems === 0 ? '' : totalItems}</span>
                <span className="material-icons">shopping_cart</span>
              </div>
            </a>
          </div>
        ) : (
          <div className="nav-link-container">
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <a className="cartAndBadge" href="">
              <span
                className={
                  totalItems === 0 ? 'totalBadge hidden' : 'totalBadge'
                }
              >
                <span>{totalItems === 0 ? '' : totalItems}</span>
                <span className="material-icons">shopping_cart</span>
              </span>
            </a>
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
