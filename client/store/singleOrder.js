import Axios from 'axios'

// ---- ACTION TYPES ----

const SET_ORDER = 'SET_ORDER'

// ---- ACTION CREATORS ----

const setOrder = order => {
  return {
    type: SET_ORDER,
    order
  }
}

// ---- THUNKS ----

export const fetchOrder = (userId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(
        `/api/orders/users/${userId}/orders/${orderId}`
      )

      dispatch(setOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// ---- REDUCER ----

const initialOrder = []

export default (state = initialOrder, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    default:
      return state
  }
}
