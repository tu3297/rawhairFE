import * as types from '../color/type.js';

export const fetchGetListColor = () =>({
        type : types.FETCH_LIST_COLOR,
        payload : ['a']
}); 
export const fetchGetListColorSuccess = payload => ({
        type : types.FETCH_LIST_COLOR_SUCCESS,
        payload : ['a']
});