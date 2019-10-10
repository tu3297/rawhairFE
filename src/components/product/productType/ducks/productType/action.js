import * as types from '../productType/types.js';

export const fetchGetListProductType = () =>({
        type : types.FETCH_LIST_PRODUCTTYPE,
        payload : ['a']
}); 
export const fetchGetListProductTypeSuccess = (payload) => ({
        type : types.FETCH_LIST_PRODUCTTYPE_SUCCESS,
        payload : payload
});
export const addProductTypeSuccess = (data) => ({
       type : types.ADD_PRODUCTTYPE_SUCCESS,
       payload: data
});
export const addProductType = (data) => ({
        type : types.ADD_PRODUCTTYPE,
        payload: data
});
export const deleteProductType = (productId) => ({
        type : types.DELETE_PRODUCTTYPE,
        payload: productId
});
export const deleteProductTypeSuccess = (data) => ({
        type : types.DELETE_PRODUCTTYPE_SUCCESS,
        payload: data
});