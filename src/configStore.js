import { 
    createStore, 
    applyMiddleware, 
  } from 'redux';
  import createSagaMiddleware from 'redux-saga';
  import {combineReducers} from 'redux';
  import rootSaga from './components/color/saga';
  import colorReducer from './components/color/ducks';
  import productTypeReducer from './components/product/productType/ducks';
  const rootReducer = combineReducers({
    colorReducer,
    productTypeReducer
  })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)
  
  export default store;