import * as React from 'react';
import Header from '../components/Header';
import './Container.css';

class Setting extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header />
        <div styleName="page-body">
          <h2>Setting</h2>
        </div>
      </div>
    );
  }
}

export default Setting;