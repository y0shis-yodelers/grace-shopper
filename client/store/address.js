import axios from 'axios'

const GET_SINGLE_ADDRESS = 'GET_SINGLE_ADDRESS'

const getSingleAddress = address => ({
  type: GET_SINGLE_ADDRESS,
  address
})

export const fetchSingleAddress = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(getSingleAddress(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SINGLE_ADDRESS:
      return [...action.address]
    default:
      return state
  }
}
