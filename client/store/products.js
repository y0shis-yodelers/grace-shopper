import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchAdminAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/admin/products')
      dispatch(getAllProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return [...action.products]
    default:
      return state
  }
}
