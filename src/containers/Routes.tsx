import * as React from 'react';
import Header from './Header';
import Search from './Search';
import Fav from './Fav';
import Setting from './Setting';
import About from './About';
import Detail from './Detail';
import { Route } from 'react-router';

export class Routes extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Search} />
        <Route path="/fav" component={Fav} />
        <Route path="/setting" component={Setting} />
        <Route path="/about" component={About} />
        <Route path="/detail/:id" render={({ match }) => (
          <Detail {...this.props} match={match} />
        )} />
      </div>
    );
  }
}
export default Routes;