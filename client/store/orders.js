import Axios from 'axios'

// ---- ACTION TYPES ----

const SET_ORDERS = 'SET_ORDERS'

// ---- ACTION CREATORS ----

const setOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
  }
}

// ---- THUNKS ----

export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/orders/users/${userId}`)

      dispatch(setOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// ---- REDUCER ----

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
