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
    default: 
    return state
   }
}