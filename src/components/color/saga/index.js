import { all } from 'redux-saga/effects'
import { watchColorAction,watchCreatColor, watchDeleteColor } from './colorSaga'

export default function* rootSaga() {
	yield all([
		watchColorAction(),
		watchCreatColor(),
		watchDeleteColor()
	])
}