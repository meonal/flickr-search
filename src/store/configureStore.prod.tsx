import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import { historyMiddleware } from '../middleware/history';
import { autoRehydrate } from 'redux-persist';

const enhancer = compose(
  applyMiddleware(thunk, logger, historyMiddleware),
  autoRehydrate()
);

export default function configureStore(initialState: any) {
  return createStore(rootReducer, initialState, enhancer);
}
