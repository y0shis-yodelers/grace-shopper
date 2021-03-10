import axios from 'axios'

// action types
const UPDATE_CART = 'UPDATE_CART'
const MERGE_GUEST_AND_PAST_CARTS = 'MERGE_GUEST_AND_PAST_CARTS'
const CLEAR_CART = 'CLEAR_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const LOOK_INTO_4_CLEAR = 'LOOK_INTO_4_CLEAR'

//something to do with return {} from reducer
export const DOUBLE_CHECK = () => ({
  type: LOOK_INTO_4_CLEAR
})

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

//Successfull order thunk
export const fetchCompleteOrder = user => {
  return async dispatch => {
    try {
      const cart = await axios.get(`api/carts/${user.id}`)
      //console.log('CART!!! THIS IS WANT', cart.data)
      const worked = await axios.post('/api/stripe/success', {
        user,
        cart: cart.data
      })

      console.log('blue', user.id)
      // create a new order axios post to orders
      const newOrder = await axios.post(`/api/orders/users/${user.id}`)
      // associate the new order to the user with userId

      // after order is created
      dispatch(clearCart())
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCompleteOrderClearCart = () => {
  return dispatch => {
    try {
      dispatch(clearCart())
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSaveCartOnLogout = (userId, cart) => {
  return async dispatch => {
    try {
      // get an array of cart items structured:
      // [{ productId, quantity }, ...]
      const cartList = Object.entries(cart).map(entry => {
        return {
          [entry[0]]: entry[1]
        }
      })

      // PUT each item in the db
      cartList.forEach(async item => {
        await axios.put(`/api/carts/${userId}`, item)
        dispatch(updateCart(...item))
      })

      // dispatch the clearCart action creator
      // which will reset local storage
      // but NOT the db, convenient!
      dispatch(clearCart())
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
    case LOOK_INTO_4_CLEAR:
      return state
    default:
      return state
  }
}
