import * as React from 'react';
import { Provider } from 'react-redux';
import HelloApp from './HelloApp';
import DevTools from './DevTools';

export default class Root extends React.Component<any, any> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <HelloApp />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
