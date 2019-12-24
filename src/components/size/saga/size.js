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
    deleteSizeApi,
    fetchGetListSizeOfProductType,
    fetchGetListSizeOfClosureFrontal
  } from '../apis/size';
  import * as types from '../../size/ducks/size/type'
  export function* getListSize(action) {
    const response = yield call(fetchListSizeApi,action);
    yield put(sizeAction.fetchGetListSizeSuccess(response));
  }
  export function* addSize(action) {
    const response = yield call(fetchaddSizeApi,action.payload.sizeData);
    let actionGetList = {
        type : types.FETCH_LIST_SIZE,
        payload : action.payload.getList
    }
    const responseList = yield call(fetchListSizeApi,actionGetList);
    yield put(sizeAction.fetchGetListSizeSuccess(responseList));
  }
  export function* deleteSize(action){
    try{
      const responseDelete = yield call(deleteSizeApi,action.payload.listId);
      yield put(sizeAction.deleteSizeSuccess(responseDelete));
      let actionGetList = {
        type : types.FETCH_LIST_SIZE,
        payload : action.payload.getList
    }
     const responseList = yield call(fetchListSizeApi ,actionGetList);
      yield put(sizeAction.fetchGetListSizeSuccess(responseList));
   } catch(error){
     console.log(error);
   }
  }
  export function* getListSizeOfProductType(action){
    try{
      const response = yield call(fetchGetListSizeOfProductType , action);
      yield put(sizeAction.fetchGetListSizeOfProductTypeSuccess(response));
   } catch(error){
     console.log(error);
   }
  }
  export function* getListSizeOfClosureFrontal(action){
    try{
      const response = yield call(fetchGetListSizeOfClosureFrontal , action);
      yield put(sizeAction.fetchGetListSizeOfClosureFrontalSuccess(response));
   } catch(error){
     console.log(error);
   }
  }