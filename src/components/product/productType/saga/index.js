import { all } from 'redux-saga/effects'
import { watchCreatProductType , watchGetListProductType } from './productType'

export default function* rootSaga() {
	yield all([
             watchCreatProductType(),
             watchGetListProductType()
	])
}