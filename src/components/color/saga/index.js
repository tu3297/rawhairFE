import { all } from 'redux-saga/effects'
import { watchColorAction } from './colorSaga'

export default function* rootSaga() {
	yield all([
		watchColorAction(),
	])
}