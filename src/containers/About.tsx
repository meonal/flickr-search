import * as React from 'react';
import { PageHeader } from 'react-bootstrap';
import './Container.css';

class About extends React.Component<any, any> {
  render() {
    return (
      <div styleName="page-body">
        <PageHeader>About</PageHeader>
        <h4>This application is sample app for react, redux and typescript.</h4>
      </div>
    );
  }
}

export default About;