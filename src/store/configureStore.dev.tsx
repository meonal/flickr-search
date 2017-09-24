import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { historyMiddleware } from '../middleware/history';
import { autoRehydrate } from 'redux-persist';
import { persistState } from 'redux-devtools';
import DevTools from '../containers/DevTools';

const match = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
const sessionKey = match != null ? match.find(_ => true)! : '';

const enhancer = compose(
  applyMiddleware(thunk, logger, historyMiddleware),
  autoRehydrate(),
  DevTools.instrument(),
  persistState(sessionKey)
);

export default function configureStore() {
  const store = createStore(rootReducer, undefined, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
