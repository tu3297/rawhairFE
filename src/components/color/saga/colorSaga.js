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
    fetchListColor,
    fetchaddColor
  } from '../apis/color';

export function* getListColor(action) {
    const response = yield call(fetchListColor);
    yield put(colorActions.fetchGetListColorSuccess(response));
  }
  export function* watchColorAction() {
    yield takeEvery(colorTypes.FETCH_LIST_COLOR, getListColor)
  }
  export function* createColor(action){
    console.log(action);
    try{
       const response = yield call(fetchaddColor,action.payload);
       yield put(colorActions.addColorSuccess(response));
       const response1 = yield call(fetchListColor);
       yield put(colorActions.fetchGetListColorSuccess(response1));
    } catch(error){
      console.log(error);
    }
  }
  export function* watchCreatColor() {
    yield takeLatest(colorTypes.ADD_COLOR, createColor)
  }