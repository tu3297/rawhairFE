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
          listProductType : action.payload
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
    case types.FETCH_LIST_PRODUCTTYPE_COLOR : {
      return {
        ...state,
        isFetching : false
      }
    }
    case types.FETCH_LIST_PRODUCTTYPE_COLOR_SUCCESS : {
      return {
        ...state,
        isFetching :false,
        listProductTypeColor : action.payload
      }
  }
    default: 
    return state
   }
}