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
export const updateProductTypeColor = (data) => ({
        type : types.UPDATE_PRODUCTTYPE_COLOR,
        payload : data
});
export const getAllProductTypeColor = (data) => ({
        type : types.FETCH_LIST_PRODUCTTYPE_COLOR,
        payload : ['a']
});
export const fetchGetListProductTypeColorSuccess = (payload) => ({
        type : types.FETCH_LIST_PRODUCTTYPE_COLOR_SUCCESS,
        payload : payload
});
export const fetchGetListProductTypeHome = () =>({
        type : types.FETCH_LIST_PRODUCTTYPE_HOME,
        payload : ['a']
}); 
export const fetchGetListProductTypeHomeSuccess = (payload) => ({
        type : types.FETCH_LIST_PRODUCTTYPE_HOME_SUCCESS,
        payload : payload
});