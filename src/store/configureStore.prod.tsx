import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import { historyMiddleware } from '../middleware/history';

const enhancer =
  applyMiddleware(thunk, logger, historyMiddleware);

export default function configureStore(initialState: any) {
  return createStore(rootReducer, initialState, enhancer);
}
