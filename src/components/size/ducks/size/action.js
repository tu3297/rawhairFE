import * as types from '../size/type';

export const fetchGetListSize = (data) =>({
        type : types.FETCH_LIST_SIZE,
        payload : data
}); 
export const fetchGetListSizeSuccess = (payload) => ({
        type : types.FETCH_LIST_SIZE_SUCCESS,
        payload : payload
});
export const addSize = (data) => ({
       type : types.ADD_SIZE,
       payload: data
});
export const addSizeSuccess = (data) => ({
        type : types.ADD_SIZE_SUCCESS,
        payload: data
});
export const deleteSize = (sizeId) => ({
        type : types.DELETE_SIZE,
        payload: sizeId
});
export const deleteSizeSuccess = (data) => ({
        type : types.DELETE_SIZE_SUCCESS,
        payload: data
});
export const fetchGetListSizeOfProductType = (data) => ({
        type : types.FETCH_LIST_SIZE_OF_PRODUCTTYPE,
        payload: data
});
export const fetchGetListSizeOfProductTypeSuccess = (data) => ({
        type : types.FETCH_LIST_SIZE_OF_PRODUCTTYPE_SUCCESS,
        payload: data
});