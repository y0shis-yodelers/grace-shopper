// action types
const UPDATE_CART = 'UPDATE_CART'

// action creators
const updateCart = (productId, quantity) => {
  return {
    type: UPDATE_CART,
    productId,
    quantity
  }
}

// thunks
export const fetchUpdateCart = (productId, quantity) => {
  return async dispatch => {
    try {
      dispatch(addToCart(productId, quantity))
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
        return newCart
      }
      // otherwise, find or create the product and update its quantity
      let newCart = {...state}
      newCart[action.productId] = action.quantity
      return newCart
    }
    default:
      return state
  }
}
