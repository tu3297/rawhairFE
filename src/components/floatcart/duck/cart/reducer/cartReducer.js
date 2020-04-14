import * as types from '../type/carttype';
const initState = {
    product: {},
    isFetching: false,
}
export default function cart(state = initState,action){
    switch(action.type){
        case types.ADD_TO_CART :{
            return {
            ...state,
            isFetching : false,
            productNew : action.payload
            }
            
        }
        case types.ADD_TO_CART_SUCCESS :{
            return {
            ...state,
            isAdd : true,
            productNew : action.payload
        
        }
    }
    case types.UPDATE_CART :{
        return {
        ...state,
        isFetching : false,
        cartData : action.payload
        }
        
    }
    case types.UPDATE_CART_SUCCESS :{
        return {
        ...state,
        isAdd : false,
        cartData : action.payload
    
    }
}
    default: 
        return state
       }
}