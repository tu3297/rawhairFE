import * as types from '../color/type.js';

export function fetchGetListColor(){
    return {
        type : types.FETCH_LIST_COLOR
    }
} 
export function fetchGetListColorSuccess(){
    return {
        type : types.FETCH_LIST_COLOR_SUCCESS,
        payload : {listColor}
    }
} 