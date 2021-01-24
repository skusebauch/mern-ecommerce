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

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: types.ORDER_PAY_SUCCESS,
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

export const getMyOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.MY_ORDERS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: types.MY_ORDERS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: types.MY_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ORDERS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: types.ORDERS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: types.ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
