// action types
const UPDATE_CART = 'UPDATE_CART'
const SET_CART_ON_LOAD_FROM_LOCAL_STORAGE =
  'SET_CART_ON_LOAD_FROM_LOCAL_STORAGE'

// action creators
const updateCart = (productId, quantity) => {
  return {
    type: UPDATE_CART,
    productId,
    quantity
  }
}
const setCartOnLoadFromLocalStorage = cart => {
  return {
    type: SET_CART_ON_LOAD_FROM_LOCAL_STORAGE,
    cart
  }
}

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
export const fetchSetCartOnLoadFromLocalStorage = cart => {
  return async dispatch => {
    try {
      dispatch(setCartOnLoadFromLocalStorage(cart))
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
    case SET_CART_ON_LOAD_FROM_LOCAL_STORAGE: {
      return {...state, ...action.cart}
    }
    default:
      return state
  }
}
