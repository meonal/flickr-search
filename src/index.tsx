import 'react-hot-loader/patch';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import history from './middleware/history';
import { locationChanged } from './actions/Location';
import { persistStore } from 'redux-persist';
import crosstabSync from 'redux-persist-crosstab';

export const store = configureStore();

// stateの永続化＆ブラウザ内での同期
const persistor = persistStore(store);
crosstabSync(persistor, { blacklist: ['router', 'location'] });

// save prev location
history.listen(location => store.dispatch(locationChanged(location.pathname)));

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const RootContainer = require('./containers/Root').default;
    render(
      <AppContainer>
        <RootContainer store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();
