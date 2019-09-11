import * as types from '../color/type.js';
const initState = {
    listColor: [],
    isFetching: false,
  }
export default function user(state = initState,action){
   switch(action.type){
    case types.FETCH_LIST_COLOR :{
         return {
           ...state,
           isFetching : true,
         }
    }
    case types.FETCH_LIST_COLOR_SUCCESS : {
        return {
          ...state,
          isFetching :false,
          listColor : action.payload
        }
    }
    case types.ADD_COLOR : {
      return {
        ...state,
        isFetching : true
      }
    }
    case types.ADD_COLOR_SUCCESS : {
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