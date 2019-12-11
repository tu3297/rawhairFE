import { 
    put,
    call 
  } from 'redux-saga/effects';
  import {productAction} from '../ducks/product'
  import { getNextIdApi } from '../apis/Product'
  export function* getNextId(action){
    try{
      const response = yield call(getNextIdApi,action);
      yield put(productAction.getNextIdSuccess(response));
   } catch(error){
     console.log(error);
   }
  }