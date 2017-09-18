import * as React from 'react';
import Header from '../components/Header';
import './Container.css';

class About extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header />
        <div styleName="page-body">
          This application is sample app for react, redux and typescript.
        </div>
      </div>
    );
  }
}

export default About;