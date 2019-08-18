import * as types from '../color/type.js';
const initState = {
    listColor: {},
    isFetching: false,
  }
export default function user(state = initState,action){
   switch(action.type){
    case types.FETCH_LIST_COLOR :{
         return {
           ...state
         }
    }
    default: 
    return state
   }
}