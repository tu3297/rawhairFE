import { 
    put,
    call , 
    all, 
    takeEvery,  
  } from 'redux-saga/effects';
  import { 
    colorTypes, 
    colorActions,
  } from '../ducks/color';
  import { 
    fetchListColor
  } from '../apis/color';

  export function* getListColor(action) {
    const response = yield call(fetchListColor);
    yield put(colorActions.fetchGetListColorSuccess(response));
  }
  
  export function* watchColorAction() {
    yield all([
      takeEvery(colorTypes.FETCH_LIST_COLOR, getListColor)
    ])
  }