import * as React from 'react';
import Search from './Search';
import Fav from './Fav';
import About from './About';
import Detail from './Detail';
import { Route } from 'react-router';

export default class Routes extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Route exact path="/" component={Search} />
        <Route path="/fav" component={Fav} />
        <Route path="/about" component={About} />
        <Route path="/detail/:id" render={({ match }) => (
          <Detail {...this.props} match={match} />
        )} />
      </div>
    );
  }
}
