// action types
const UPDATE_CART = 'UPDATE_CART'
const MERGE_GUEST_AND_PAST_CARTS = 'MERGE_GUEST_AND_PAST_CARTS'
const CLEAR_CART = 'CLEAR_CART'

// action creators
const updateCart = (productId, quantity) => {
  return {
    type: UPDATE_CART,
    productId,
    quantity
  }
}
const mergePastAndGuestCarts = (pastCart, cartFromLocalStorage) => {
  return {
    type: MERGE_GUEST_AND_PAST_CARTS,
    pastCart,
    cartFromLocalStorage
  }
}
export const clearCart = () => ({
  type: CLEAR_CART
})

// thunks
export const fetchUpdateCart = (productId, quantity) => {
  return async dispatch => {
    try {
      dispatch(updateCart(productId, quantity))
    } catch (err) {
      console.error(err)
    }
  }
}
export const fetchMergePastAndGuestCarts = (pastCart, cartFromLocalStorage) => {
  return async dispatch => {
    try {
      dispatch(mergePastAndGuestCarts(pastCart, cartFromLocalStorage))
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
    case MERGE_GUEST_AND_PAST_CARTS:
      return {...state, ...action.pastCart, ...action.cartFromLocalStorage}
    case CLEAR_CART: {
      localStorage.setItem('cart', JSON.stringify({}))
      return {}
    }
    default:
      return state
  }
}
