import { all ,takeEvery, takeLatest} from 'redux-saga/effects'
import {sizeTypes} from './components/size/ducks/size'
import { 
    colorTypes
  } from './components/color/ducks/color';
  import { 
    ptTypes,
  } from './components/product/productType/ducks/productType';
import {productTypes} from './components/product/ducks/product'
import {cartTypes} from './components/floatcart/duck/cart'
import { getListColor,createColor,deleteColor,getListColorOfProductType } from './components/color/saga/colorSaga'
import { createProductType,getListProductType,deleteProductType, updateProducttypeColor,getAllProductTypeColor ,getListProductTypeHome} from './components/product/productType/saga/productType'
import { getListSize , addSize ,deleteSize , getListSizeOfProductType,getListSizeOfClosureFrontal} from './components/size/saga/size'
import { getData,saveProduct ,getAllProduct,getProduct,getProductInfo } from './components/product/saga/productSaga'
import { addToCart , updateCart} from './components/floatcart/saga/cartSaga'
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
        takeLatest(ptTypes.FETCH_LIST_PRODUCTTYPE_HOME,getListProductTypeHome),
        takeEvery(sizeTypes.FETCH_LIST_SIZE,getListSize),
        takeLatest(sizeTypes.ADD_SIZE,addSize),
        takeLatest(sizeTypes.DELETE_SIZE,deleteSize),
        takeLatest(sizeTypes.FETCH_LIST_SIZE_OF_PRODUCTTYPE,getListSizeOfProductType),
        takeLatest(sizeTypes.FETCH_LIST_SIZE_OF_CLOSUREFRONTAL,getListSizeOfClosureFrontal),
        takeLatest(productTypes.GET_DATA,getData),
        takeLatest(productTypes.SAVE_PRODUCT,saveProduct),
        takeLatest(productTypes.GET_ALL_PRODUCT,getAllProduct),
        takeLatest(productTypes.GET_PRODUCT,getProduct),
        takeLatest(productTypes.GET_PRODUCT_INFO,getProductInfo),
        takeLatest(cartTypes.ADD_TO_CART,addToCart),
        takeLatest(cartTypes.UPDATE_CART,updateCart),
    ]);
}