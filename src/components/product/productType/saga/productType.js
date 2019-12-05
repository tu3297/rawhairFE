import { 
    put,
    call
  } from 'redux-saga/effects';
  import { 
    ptTypes, 
    productTypeAction,
  } from '../ducks/productType';
  import { 
    fetchListProductTypeApi,
    fetchaddProductTypeApi,
    deleteProductTypeApi,
    updateProductTypeColor,
    getAllProductTypeColorApi
  } from '../apis/productType';
  export function* createProductType(action){
    try{
       const responseAdd = yield call(fetchaddProductTypeApi,action.payload);
       yield put(productTypeAction.addProductTypeSuccess(responseAdd));
       const responseList = yield call(fetchListProductTypeApi);
       yield put(productTypeAction.fetchGetListProductTypeSuccess(responseList));
    } catch(error){
      console.log(error);
    }
  }
  export function* getListProductType(action) {
    const response = yield call(fetchListProductTypeApi);
    yield put(productTypeAction.fetchGetListProductTypeSuccess(response));
  }
  export function* deleteProductType(action){
    try{
      const responseDelete = yield call(deleteProductTypeApi,action.payload);
      yield put(productTypeAction.deleteProductTypeSuccess(responseDelete));
      const responseList = yield call(fetchListProductTypeApi);
      yield put(productTypeAction.fetchGetListProductTypeSuccess(responseList));
   } catch(error){
     console.log(error);
   }
  }
  export function* updateProducttypeColor(action){
     try{
        const response = yield call(updateProductTypeColor,action.payload);
     }catch(error){
       console.log(error);
     }
  }
  export function* getAllProductTypeColor(action){
    try{
    const response = yield call(getAllProductTypeColorApi);
    yield put(productTypeAction.fetchGetListProductTypeColorSuccess(response));
  }catch(error){
    console.log(error);
  }
  }