/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'
import store from '../store'
import {fetchSaveCartOnLogout} from '../store/cart'

const Navbar = ({user, isLoggedIn, cart}) => {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <div>
      <Link to="/home">
        <img className="logo" src="https://i.imgur.com/wj50jx5.png" />
        <span className="tagline">Shred Like You Mean It</span>
      </Link>
      <nav>
        {isLoggedIn ? (
          <div className="nav-link-container">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="https://github.com/y0shis-yodelers/grace-shopper">
              About Us
            </a>
            <a
              href="#"
              onClick={async () => {
                await fetchSaveCartOnLogout(user.id, cart)
                store.dispatch(logout())
              }}
            >
              Logout
            </a>
            <Link to="/users/:userId">Profile</Link>
            {user.isAdmin && <Link to="/admin/users">Users</Link>}
            {user.isAdmin && <Link to="/admin/products">Products</Link>}
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
            <a href="https://github.com/y0shis-yodelers/grace-shopper">
              About Us
            </a>
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
  user: state.user,
  isLoggedIn: !!state.user.id
})

export default connect(mapState)(Navbar)
