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
const updateCart = (product, quantity) => ({
  type: UPDATE_CART,
  product,
  quantity
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
      const updatedProduct = await axios.put(
        `/api/carts/users/${userId}`,
        updateInfo
      )
      dispatch(updateCart(updatedProduct, quantity))
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
      // if quantity === 0, return state without the corresponding product
      if (action.quantity === 0)
        return state.filter(product => product.id !== action.product.id)

      // otherwise, replace the product on state
      return [
        ...state.filter(product => product.id !== action.product.id),
        action.product
      ]
    }
    case CLEAR_CART: {
      localStorage.setItem('cart', JSON.stringify([]))
      return []
    }
    default:
      return state
  }
}
