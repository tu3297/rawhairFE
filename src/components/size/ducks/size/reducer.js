import * as types from '../size/type.js';
const initState = {
    listSize: [],
    isFetching: false,
  }
export default function productType(state = initState,action){
   switch(action.type){
    case types.FETCH_LIST_SIZE :{
         return {
           ...state,
           isFetching : true,
         }
    }
    case types.FETCH_LIST_SIZE_SUCCESS : {
        return {
          ...state,
          isFetching :false,
          listSize : action.payload
        }
    }
    case types.ADD_SIZE : {
      return {
        ...state,
        isFetching : true
      }
    }
    case types.ADD_SIZE_SUCCESS : {
      return {
      ...state,
      isFetching : false,
      size : action.size
      }
    }
    case types.DELETE_SIZE : {
      return {
        ...state,
        isFetching : true
      }
    }
    case types.DELETE_SIZE_SUCCESS : {
      return {
        ...state,
        isFetching : false,
        size : action.size
      }
    }
    default: 
    return state
   }
}