const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'

const addToCart = item => {
  return {type: ADD_TO_CART, item}
}

const removeFromCart = item => {
  return {type: REMOVE_FROM_CART, item}
}

const clearCart = () => {
  return {type: CLEAR_CART}
}

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.item]}
    case CLEAR_CART:
      return {...state, cart: []}
    default:
      return state
  }
}
