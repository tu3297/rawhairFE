import colorSaga from './components/color/saga';
import productTypeSaga from './components/product/productType/saga';
import { all,fork } from 'redux-saga/effects'
export default function* rootSaga () {
    yield all([
        fork(colorSaga),
        fork(productTypeSaga)
    ]);
}