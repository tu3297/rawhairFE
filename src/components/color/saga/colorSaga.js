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
    addColor
  } from '../apis/color';

  function* getListColor(action) {
    const response = yield call(fetchListColor);
    yield put(colorActions.fetchGetListColorSuccess(response));
  }
  
  export function* watchColorAction() {
    yield takeEvery(colorTypes.FETCH_LIST_COLOR, getListColor)
  }
  function* createColor(action){
    console.log('add');
    try{
       const response = yield call(addColor,action.data);
       yield put(colorActions.addColorSuccess(response));
    } catch(error){
      console.log(error);
    }
  }
  export function* watchCreatColor() {
    yield takeLatest(colorTypes.ADD_COLOR, createColor)
  }