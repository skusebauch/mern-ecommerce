import axios from 'axios'
import * as types from '../constants/orderConstants'

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_CREATE_REQUEST,
    })

    // destructure userLogin.userInfo from state
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: types.ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: types.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDER_DETAILS_REQUEST,
    })

    // destructure userLogin.userInfo from state
    const {
      userLogin: { userInfo },
    } = getState()
    // get - get rid of contentType -> only at post req
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: types.ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: types.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
