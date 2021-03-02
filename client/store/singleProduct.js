import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getSingleProduct = (singleProduct) => ({
  type: GET_SINGLE_PRODUCT,
  singleProduct,
})

const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/products/${productId}`)
      dispatch(getSingleProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = {}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {
        ...action.singleProduct,
      }
  }
}
