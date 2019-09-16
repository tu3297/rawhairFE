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
    fetachaddColor
  } from '../apis/color';

export function* getListColor(action) {
    console.log('create fetch');
    const response = yield call(fetchListColor);
    yield put(colorActions.fetchGetListColorSuccess('response'));
  }
  export function* watchColorAction() {
    yield takeEvery(colorTypes.FETCH_LIST_COLOR, getListColor)
  }
  export function* createColor(action){
    console.log('add color');
    try{
       //const response = yield call(fetachaddColor,action.data);
       yield put(colorActions.addColorSuccess('response'));
    } catch(error){
      console.log(error);
    }
  }
  export function* watchCreatColor() {
    yield takeLatest(colorTypes.ADD_COLOR, createColor)
  }