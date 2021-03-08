import axios from 'axios'

const GET_SINGLE_ADDRESS = 'GET_SINGLE_ADDRESS'

const getSingleAddress = (name, address) => {
  return {type: GET_SINGLE_ADDRESS, name, address}
}

export const fetchSingleAddress = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      console.log('data', data)
      dispatch(getSingleAddress(data.name, data.addresses[0]))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = {}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SINGLE_ADDRESS:
      console.log('state', action)
      return {
        ...state,
        name: action.name,
        address: {
          number: action.address.number,
          houseOrApt: action.address.houseOrApt,
          streetName: action.address.streetName,
          city: action.address.city,
          state: action.address.state,
          zip: action.address.zip
        }
      }
    default:
      return state
  }
}
