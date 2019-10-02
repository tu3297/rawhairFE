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