import 'react-hot-loader/patch';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <AppContainer>
    <Root
      store={store}
    />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const RootContainer = require('./containers/Root').default;
    render(
      <AppContainer>
        <RootContainer
          store={store}
        />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();