import * as types from '../type/carttype';

export const addToCart = (data) => ({
    type : types.ADD_TO_CART,
    payload: data
});
export const addToCartSuccess = (data) => ({
    type : types.ADD_TO_CART_SUCCESS,
    payload: data
});
export const updateCart = (data) => ({
    type : types.UPDATE_CART,
    payload: data
});
export const updateCartSuccess = (data) => ({
    type : types.UPDATE_CART_SUCCESS,
    payload: data
});