import * as React from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import Routes from './Routes';
import WrappedRouter from './WrappedRouter';

export default class Root extends React.Component<any, any> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <div>
          <WrappedRouter history={history}>
            <Routes />
          </WrappedRouter>
          <DevTools />
        </div>
      </Provider>
    );
  }
}
