import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import logger from 'redux-logger';

const match = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
const sessionKey = match != null ? match.find(_ => true)! : 'default';

const enhancer = compose(
  applyMiddleware(thunk, logger),
  DevTools.instrument(),
  persistState(sessionKey)
);

export default function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
