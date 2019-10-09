import { 
    put,
    call , 
    all,
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
    deleteColorApi
  } from '../apis/color';
export function* getListColor(action) {
    const response = yield call(fetchListColorApi);
    yield put(colorActions.fetchGetListColorSuccess(response));
  }
  export function* watchColorAction() {
    yield takeEvery(colorTypes.FETCH_LIST_COLOR, getListColor)
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
  export function* watchCreatColor() {
    yield takeLatest(colorTypes.ADD_COLOR, createColor)
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
  export function* watchDeleteColor() {
    yield takeLatest(colorTypes.DELETE_COLOR, deleteColor)
  }