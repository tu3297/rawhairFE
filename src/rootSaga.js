import { all ,takeEvery, takeLatest} from 'redux-saga/effects'
import {sizeTypes} from './components/size/ducks/size'
import { 
    colorTypes
  } from './components/color/ducks/color';
  import { 
    ptTypes,
  } from './components/product/productType/ducks/productType';
import { getListColor,createColor,deleteColor,getListColorOfProductType } from './components/color/saga/colorSaga'
import { createProductType,getListProductType,deleteProductType, updateProducttypeColor,getAllProductTypeColor} from './components/product/productType/saga/productType'
import { getListSize , addSize ,deleteSize } from './components/size/saga/size'
export function* rootSaga () {
    yield all([
        takeEvery(colorTypes.FETCH_LIST_COLOR,getListColor),
        takeLatest(colorTypes.ADD_COLOR,createColor),
        takeLatest(colorTypes.DELETE_COLOR,deleteColor),
        takeLatest(colorTypes.FETCH_GET_LIST_COLOR_PRODUCTTYPE,getListColorOfProductType),
        takeEvery(ptTypes.FETCH_LIST_PRODUCTTYPE,getListProductType),
        takeLatest(ptTypes.ADD_PRODUCTTYPE,createProductType),
        takeLatest(ptTypes.DELETE_PRODUCTTYPE,deleteProductType),
        takeLatest(ptTypes.UPDATE_PRODUCTTYPE_COLOR,updateProducttypeColor),
        takeLatest(ptTypes.FETCH_LIST_PRODUCTTYPE_COLOR,getAllProductTypeColor),
        takeEvery(sizeTypes.FETCH_LIST_SIZE,getListSize),
        takeLatest(sizeTypes.ADD_SIZE,addSize),
        takeLatest(sizeTypes.DELETE_SIZE,deleteSize),
    ]);
}