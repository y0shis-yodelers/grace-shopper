import axios from 'axios'

// action types
const UPDATE_CART = 'UPDATE_CART'
const MERGE_GUEST_AND_PAST_CARTS = 'MERGE_GUEST_AND_PAST_CARTS'
const CLEAR_CART = 'CLEAR_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

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
export const checkoutCart = cart => ({
  type: CHECKOUT_CART,
  cart
})

// thunks
export const fetchUpdateCart = (userId, productId, quantity) => {
  return async dispatch => {
    try {
      // here we check the truthiness of userId
      // if userId is 0, we skip the backend PUT action
      // since there's no user to update!
      if (userId)
        await axios.put(`/api/carts/${userId}`, {
          productId: productId,
          quantity: quantity
        })
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
export const fetchClearCart = userId => {
  return async dispatch => {
    try {
      // check if user is logged in
      // if userId is undefined, don't make the backend call
      if (userId) await axios.delete(`/api/carts/${userId}`)
      dispatch(clearCart())
    } catch (err) {
      console.error(err)
    }
  }
}
export const fetchCheckoutCart = cart => {
  return async dispatch => {
    try {
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
    case MERGE_GUEST_AND_PAST_CARTS: {
      // TODO
      // here, we need to know whether user
      // has logged in from a previous guestState
      // where a guest cart has been created
      // so we can reverse the order of the spreads
      // and spread present cartFromLocalStorage
      // OVER pastCart
      // for now, this defaults to pastCart over localState
      // so that db changes persist across browsers and devices
      const newCart = {
        ...state,
        ...action.cartFromLocalStorage,
        ...action.pastCart
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    }
    case CLEAR_CART: {
      localStorage.setItem('cart', JSON.stringify({}))
      return {}
    }
    default:
      return state
  }
}
