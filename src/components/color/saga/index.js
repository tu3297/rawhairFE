import { all } from 'redux-saga/effects'
import { watchColorAction,watchCreatColor, watchDeleteColor } from './colorSaga'

export default function* colorSaga() {
	yield all([
		watchColorAction(),
		watchCreatColor(),
		watchDeleteColor()
	])
}