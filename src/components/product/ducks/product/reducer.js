import * as types from '../../ducks/product/type';
const initState = {
    isFetching: false,
  }
export default function product(state = initState,action){
   switch(action.type){
    case types.GET_ID :{
         return {
           ...state,
           isFetching : true,
         }
    }
    case types.GET_ID_SUCCESS :{
        return {
          ...state,
          isFetching : false,
          id : action.payload.Id
        }
   }
   case types.SAVE_PRODUCT :{
    return {
      ...state,
      isFetching : true,
    }
   }
   case types.SAVE_PRODUCT_SUCCESS :{
   return {
     ...state,
     isFetching : false,
     id : action.payload.Id
   }
   }
   case types.GET_ALL_PRODUCT : {
    return {
    ...state,
    isFetching : true,
   }
   }
   case types.GET_ALL_PRODUCT_SUCCESS : {
    return {
    ...state,
    isFetching : false,
    listProduct : action.payload
   }
   }
   case types.GET_PRODUCT : {
    return {
    ...state,
    isFetching : true,
   }
   }
   case types.GET_PRODUCT_SUCCESS : {
    return {
    ...state,
    isFetching : false,
    product : action.payload
   }
   }
    default: 
    return state
   }
}