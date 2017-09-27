import 'react-hot-loader/patch';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import history from './middleware/history';
//import { persistStore } from 'redux-persist';
//import crosstabSync from 'redux-persist-crosstab';
import SettingActions from './actions/Setting';
import AccountActions from './actions/Account';
import SearchActions from './actions/Search';
import RoutingActions from './actions/Routing';

export const store = configureStore();

// stateの永続化＆ブラウザ内での同期
//const persistor = persistStore(store, { blacklist: ['router'] });
//crosstabSync(persistor, { blacklist: ['router'] });

// ActionDispatcherの初期化
// ・シングルトンのコンストラクタで実行したいものがある
// ・getState()がほしい
// 等の理由のためここで初回の生成を行っておく
//const { dispatch, getState } = store.dispatch;
RoutingActions.getInstance(store.dispatch);
SettingActions.getInstance(store.dispatch, store.getState);
AccountActions.getInstance(store.dispatch);
SearchActions.getInstance(store.dispatch);


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
