import axios from 'axios'
import * as types from '../constants/userConstants'

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    // data = get back from userController.js res.json({})
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: types.USER_LOGOUT,
  })
}

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: types.USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    // data = get back from userController.js res.json({})
    dispatch({
      type: types.USER_REGISTER_SUCCESS,
      payload: data,
    })
    // after register automatically logged in
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/users/${id}`, config)
    // data = get back from userController.js res.json({})
    dispatch({
      type: types.USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`/api/users/profile`, user, config)
    // data = get back from userController.js res.json({})
    dispatch({
      type: types.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: types.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
