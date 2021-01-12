import axios from 'axios'
import * as types from '../constants/cartConstants'

// async request therefore thunk syntax
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: types.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  // stringify because we can only save strings in local storage - if you take it parse it out
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: types.CART_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = data => dispatch => {
  dispatch({
    type: types.CART_SAVE_SHIPPING_ITEM,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
