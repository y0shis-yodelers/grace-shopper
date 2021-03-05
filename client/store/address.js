import axios from 'axios'

const GET_SINGLE_ADDRESS = 'GET_SINGLE_ADDRESS'

const getSingleAddress = (name, address) => ({
  type: GET_SINGLE_ADDRESS,
  name,
  address
})

export const fetchSingleAddress = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(getSingleAddress(data.name, data.address))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = {}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SINGLE_ADDRESS:
      return {
        name: action.name,
        number: action.number,
        houseOrApt: action.houseOrApt,
        streetName: action.streetName,
        city: action.city,
        state: action.state,
        zip: action.zip
      }
    default:
      return state
  }
}
