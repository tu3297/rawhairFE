import { 
    put,
    call , 
    all,
    takeLatest,
    takeEvery,  
  } from 'redux-saga/effects';
  import { 
    ptTypes, 
    productTypeAction,
  } from '../ducks/productType';
  import { 
    fetchListProductTypeApi,
    fetchaddProductTypeApi,
    deleteProductTypeApi
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
  export function* watchCreatProductType() {
    yield takeLatest(ptTypes.ADD_PRODUCTTYPE, createProductType)
  }
  export function* getListProductType(action) {
    const response = yield call(fetchListProductTypeApi);
    yield put(productTypeAction.fetchGetListProductTypeSuccess(response));
  }
  export function* watchGetListProductType() {
    yield takeEvery(productTypeAction.fetchListProductTypeApi, getListProductType)
  }