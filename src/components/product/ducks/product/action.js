import * as types from '../../ducks/product/type'
export const getNextId = () =>({
    type : types.GET_ID,
    payload : ['a']
});
export const getNextIdSuccess = (payload) => ({
    type : types.GET_ID_SUCCESS,
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