import { 
    put,
    call , 
    takeLatest,
    takeEvery,  
  } from 'redux-saga/effects';
  import { 
    colorTypes, 
    colorActions,
  } from '../ducks/color';
  import { 
    fetchListColorApi,
    fetchaddColorApi,
    deleteColorApi,
    fetchGetListColorOfProductType
  } from '../apis/color';
  export function* getListColor(action) {
    const response = yield call(fetchListColorApi);
    yield put(colorActions.fetchGetListColorSuccess(response));
  }
  export function* createColor(action){
    console.log(action);
    try{
       const responseAdd = yield call(fetchaddColorApi,action.payload);
       yield put(colorActions.addColorSuccess(responseAdd));
       const responseList = yield call(fetchListColorApi);
       yield put(colorActions.fetchGetListColorSuccess(responseList));
    } catch(error){
      console.log(error);
    }
  }
  export function* deleteColor(action){
    console.log(action);
    try{
       const responseDelete = yield call(deleteColorApi,action.payload);
       console.log(responseDelete);
       yield put(colorActions.deleteColorSuccess(responseDelete));
       const responseList = yield call(fetchListColorApi);
       yield put(colorActions.fetchGetListColorSuccess(responseList));
    } catch(error){
      console.log(error);
    }
  }
  export function* getListColorOfProductType(action){
    try{
      const response = yield call(fetchGetListColorOfProductType,action);
      yield put(colorActions.fetchGetListColorOfProductTypeSuccess(response));
   } catch(error){
     console.log(error);
   }
  }