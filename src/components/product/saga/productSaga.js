import { 
    put,
    call 
  } from 'redux-saga/effects';
  import {productAction} from '../ducks/product'
  import { getDataApi,saveProductApi,getAllProductApi,getProductApi,getAllProductInfoApi} from '../apis/Product'
  export function* getData(action){
    try{
      const response = yield call(getDataApi,action);
      yield put(productAction.getDataSuccess(response));
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
  export function* getAllProduct(action){
    try{
      const response = yield call(getAllProductApi,action);
      yield put(productAction.getAllProductSuccess(response));
   } catch(error){
     console.log(error);
   }
  }
  export function* getProduct(action){
    try{
      const response = yield call(getProductApi,action);
      yield put(productAction.getProductSuccess(response));
   } catch(error){
     console.log(error);
   }
  }
  export function* getProductInfo(action){
    try{
      const response = yield call(getAllProductInfoApi,action);
      yield put(productAction.getProductInfoSuccess(response));
   } catch(error){
     console.log(error);
   }
  }