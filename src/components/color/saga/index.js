
import { watchColorAction,watchCreatColor, watchDeleteColor } from './colorSaga'
export const  colorSaga  = [
		watchColorAction(),
		watchCreatColor(),
		watchDeleteColor()
]