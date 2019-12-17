import { 
    put,
    call 
  } from 'redux-saga/effects';
  import {productAction} from '../ducks/product'
  import { getNextIdApi,saveProductApi } from '../apis/Product'
  export function* getNextId(action){
    try{
      const response = yield call(getNextIdApi,action);
      yield put(productAction.getNextIdSuccess(response));
   } catch(error){
     console.log(error);
   }
  }
  export function* saveProduct(action){
    try{
      const response = yield call(saveProductApi,action.payload);
      yield put(productAction.saveProductSuccess(response));
   } catch(error){
     console.log(error);
   }
  }