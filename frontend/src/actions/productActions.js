import axios from 'axios'
import * as types from '../constants/productConstants'

// async request therefore thunk
export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: types.PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products')
    dispatch({
      type: types.PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: types.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listProductDetails = id => async dispatch => {
  try {
    dispatch({ type: types.PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: types.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: types.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
