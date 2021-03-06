import axios from 'axios'

// action types
const SET_USER_OR_GUEST_CART = 'SET_USER_OR_GUEST_CART'
const UPDATE_CART = 'UPDATE_CART'

// action creators
const setUserOrGuestCart = mergedCart => {
  return {
    type: SET_USER_OR_GUEST_CART,
    mergedCart
  }
}
const updateCart = (productId, quantity) => {
  return {
    type: UPDATE_CART,
    productId,
    quantity
  }
}

// thunks
export const fetchSetUserOrGuestCart = userId => {
  return async dispatch => {
    try {
      // get guestCart from localStorage
      // if it doesn't exist, set to {}
      let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
      if (!cartFromLocalStorage) cartFromLocalStorage = {}

      // get cart from database by grabbing the unfulfilled
      // order in the user's order history
      // if there is none, set to empty object
      const orders = (await axios.get(`/api/users/${userId}`)).data.orders || []
      let pastCart = {}
      if (orders.length) {
        pastCart = orders.filter(order => !order.date)[0]
      }

      // assuming that any decisions the user made in guest mode
      // were the most recent, we spread cartFromLocalStorage
      // over the pastCart from the database
      const mergedCart = {...pastCart}
      dispatch(setUserOrGuestCart(mergedCart))
    } catch (err) {
      console.error(err)
    }
  }
}
export const fetchUpdateCart = (productId, quantity) => {
  return async dispatch => {
    try {
      dispatch(updateCart(productId, quantity))
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state of subreducer
const initState = {}

// subreducer
export default (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CART: {
      // if quantity === 0, it's a delete method
      // delete the key and return the newCart
      if (action.quantity === 0) {
        let newCart = {...state}
        delete newCart[action.productId]
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart
      }
      // otherwise, find or create the product and update its quantity
      let newCart = {...state}
      newCart[action.productId] = action.quantity
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    }
    case SET_USER_OR_GUEST_CART:
      return {...state, ...action.mergedCart}
    default:
      return state
  }
}
