import { all } from 'redux-saga/effects'
import { watchColorAction,watchCreatColor } from './colorSaga'

export default function* rootSaga() {
	yield all([
		watchColorAction(),
		watchCreatColor(),
	])
}