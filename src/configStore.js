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
  import productReducer from './components/product/ducks'
  import cartReducer from './components/floatcart/duck'
  const rootReducer = combineReducers({
    colorReducer,
    productTypeReducer,
    sizeReducer,
    productReducer,
    cartReducer
  })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)
  
  export default store;