import * as types from '../../ducks/product/type'
export const getNextId = () =>({
    type : types.GET_ID,
    payload : ['a']
});
export const getNextIdSuccess = (payload) => ({
    type : types.GET_ID_SUCCESS,
    payload : payload
});