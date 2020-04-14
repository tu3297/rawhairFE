import * as types from '../../ducks/product/type';
const initState = {
    isFetching: false,
  }
export default function product(state = initState,action){
  console.log(action);
   switch(action.type){
    case types.GET_DATA :{
         return {
           ...state,
           isFetching : true,
         }
    }
    case types.GET_DATA_SUCCESS :{
        return {
          ...state,
          isFetching : false,
          initData : action.payload
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
    productUpdate : action.payload
   }
  }
   case types.GET_PRODUCT_INFO : {
    return {
    ...state,
    isFetching : true,
   }
   }
   case types.GET_PRODUCT_INFO_SUCCESS : {
    return {
    ...state,
    isFetching : false,
    productInfo : action.payload
   }
   }
    default: 
    return state
   }
}