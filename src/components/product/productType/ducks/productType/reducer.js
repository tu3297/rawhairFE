import * as types from '../productType/types.js';
const initState = {
    listProductType: [],
    isFetching: false,
  }
export default function productType(state = initState,action){
   switch(action.type){
    case types.FETCH_LIST_PRODUCTTYPE :{
         return {
           ...state,
           isFetching : true,
         }
    }
    case types.FETCH_LIST_PRODUCTTYPE_SUCCESS : {
        return {
          ...state,
          isFetching :false,
          listColor : action.payload
        }
    }
    case types.ADD_PRODUCTTYPE : {
      return {
        ...state,
        isFetching : true
      }
    }
    case types.ADD_PRODUCTTYPE_SUCCESS : {
      return {
      ...state,
      isFetching : false,
      color : action.color
      }
    }
    case types.DELETE_PRODUCTTYPE : {
      return {
        ...state,
        isFetching : true
      }
    }
    case types.DELETE_PRODUCTTYPE_SUCCESS : {
      return {
        ...state,
        isFetching : false,
        color : action.color
      }
    }
    default: 
    return state
   }
}