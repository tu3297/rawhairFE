import { 
    put,
    call , 
    all,
    takeLatest,
    takeEvery,  
  } from 'redux-saga/effects';
  import { 
    sizeTypes, 
    sizeAction,
  } from '../ducks/size';
  import { 
    fetchListSizeApi,
    fetchaddSizeApi,
    deleteSizeApi
  } from '../apis/size';
  export function* getListSize(action) {
    const response = yield call(fetchListSizeApi,action);
    yield put(sizeAction.fetchGetListSizeSuccess(response));
  }