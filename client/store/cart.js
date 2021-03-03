import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const SAVE_CART = 'SAVE_CART' //save cart to local storage
const LOAD_CART = 'LOAD_CART' //save cart to local storage

const addToCart = item => {
  return {type: ADD_TO_CART, item}
}

export const removeFromCart = itemId => {
  return {type: REMOVE_FROM_CART, itemId}
}

export const clearCart = () => {
  return {type: CLEAR_CART}
}

export const saveCart = () => {
  return {type: SAVE_CART}
}

export const loadCart = () => {
  return {type: LOAD_CART}
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(addToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.item]}
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.productId !== action.itemId)
      }
    case CLEAR_CART:
      return {...state, cart: []}
    case SAVE_CART:
      window.localStorage.setItem('cart', JSON.stringify(state))
      return state
    case LOAD_CART:
      return JSON.parse(window.localStorage.getItem('cart'))
    default:
      return state
  }
}
