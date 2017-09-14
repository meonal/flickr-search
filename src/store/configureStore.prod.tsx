import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger'

const enhancer = applyMiddleware(thunk, logger);

export default function configureStore(initialState: any) {
  return createStore(rootReducer, initialState, enhancer);
}
