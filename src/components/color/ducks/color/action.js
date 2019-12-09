import * as types from '../color/type.js';

export const fetchGetListColor = () =>({
        type : types.FETCH_LIST_COLOR,
        payload : ['a']
}); 
export const fetchGetListColorSuccess = (payload) => ({
        type : types.FETCH_LIST_COLOR_SUCCESS,
        payload : payload
});
export const addColorSuccess = (data) => ({
       type : types.ADD_COLOR_SUCCESS,
       payload: data
});
export const addColor = (data) => ({
        type : types.ADD_COLOR,
        payload: data
});
export const deleteColor = (colorId) => ({
        type : types.DELETE_COLOR,
        payload: colorId
});
export const deleteColorSuccess = (data) => ({
        type : types.DELETE_COLOR_SUCCESS,
        payload: data
});
export const fetchGetListColorOfProductType = (data) => ({
        type : types.FETCH_GET_LIST_COLOR_PRODUCTTYPE,
        payload : data
});
export const fetchGetListColorOfProductTypeSuccess = (payload) => ({
        type : types.FETCH_GET_LIST_COLOR_PRODUCTTYPE_SUCCESS,
        payload : payload
});