import { 
    createStore, 
    applyMiddleware, 
  } from 'redux';
  import createSagaMiddleware from 'redux-saga';
  import {combineReducers} from 'redux';
  import {rootSaga} from './rootSaga';
  import colorReducer from './components/color/ducks';
  import productTypeReducer from './components/product/productType/ducks';
  import sizeReducer from './components/size/ducks';
  const rootReducer = combineReducers({
    colorReducer,
    productTypeReducer,
    sizeReducer
  })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)
  
  export default store;