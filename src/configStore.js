import { 
    createStore, 
    applyMiddleware, 
  } from 'redux';
  import createSagaMiddleware from 'redux-saga';
  
  import rootSaga from './components/color/saga';
  import rootReducer from './components/color/ducks';
  
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );
  
  sagaMiddleware.run(rootSaga)
  
  export default store;