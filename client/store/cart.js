import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const SAVE_CART = 'SAVE_CART' //save cart to local storage
const LOAD_CART = 'LOAD_CART' //save cart to local storage

export const addToCart = item => ({type: ADD_TO_CART, item})
export const removeFromCart = itemId => ({type: REMOVE_FROM_CART, itemId})
export const clearCart = () => ({type: CLEAR_CART})
export const saveCart = () => ({type: SAVE_CART})
export const loadCart = () => ({type: LOAD_CART})

export const fetchProductToAdd = productId => {
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
        cart: state.cart.filter(
          item => item.productId !== action.item.productId
        )
      }

    case CLEAR_CART:
      return {...state, cart: []}
    case SAVE_CART:
      window.localStorage.setItem('cart', JSON.stringify(state))
      return state
    case LOAD_CART:
      return {...state, cart: JSON.parse(window.localStorage.getItem('cart'))}
    default:
      return state
  }
}
