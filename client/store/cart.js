import axios from 'axios'

// action types
const LOAD_CART = 'LOAD_CART'
const UPDATE_CART = 'UPDATE_CART'
const CLEAR_CART = 'CLEAR_CART'

// action dispatchers
const loadCart = cart => ({
  type: LOAD_CART,
  cart
})
const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})
const clearCart = () => ({
  type: CLEAR_CART
})

// thunks
export const fetchLoadCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/carts/users/${userId}`)
      dispatch(loadCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const fetchUpdateCart = (userId, productId, quantity) => {
  return async dispatch => {
    try {
      const updateInfo = {
        productId,
        quantity
      }

      // update ProductOrder instance
      await axios.put(`/api/carts/users/${userId}`, updateInfo)

      // get updatedCart
      const {data} = await axios.get(`/api/carts/users/${userId}`)

      dispatch(updateCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const fetchClearCart = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/carts/users/${userId}`)
      dispatch(clearCart())
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state: cart is an array of products
const initState = []

// subreducer
export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_CART: {
      return [...action.cart]
    }
    case UPDATE_CART: {
      return [...action.cart]
    }
    case CLEAR_CART: {
      localStorage.setItem('cart', JSON.stringify([]))
      return []
    }
    default:
      return state
  }
}
