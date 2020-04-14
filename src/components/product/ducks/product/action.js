import * as types from '../../ducks/product/type'
export const getData = () =>({
    type : types.GET_DATA,
    payload : ['a']
});
export const getDataSuccess = (payload) => ({
    type : types.GET_DATA_SUCCESS,
    payload : payload
});
export const saveProduct = (data) =>({
    type : types.SAVE_PRODUCT,
    payload : data
});
export const saveProductSuccess = (payload) => ({
    type : types.SAVE_PRODUCT_SUCCESS,
    payload : payload
});
export const getAllProduct = (data) =>({
    type : types.GET_ALL_PRODUCT,
    payload : data
});
export const getAllProductSuccess = (payload) => ({
    type : types.GET_ALL_PRODUCT_SUCCESS,
    payload : payload
});
export const getProduct = (data) =>({
    type : types.GET_PRODUCT,
    payload : data
});
export const getProductSuccess = (payload) => ({
    type : types.GET_PRODUCT_SUCCESS,
    payload : payload
});
export const getProductInfo = (data) =>({
    type : types.GET_PRODUCT_INFO,
    payload : data
});
export const getProductInfoSuccess = (payload) => ({
    type : types.GET_PRODUCT_INFO_SUCCESS,
    payload : payload
});