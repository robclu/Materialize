import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import App   from './components/app';
import About from './containers/about';

class Routes  extends Component {
  render() {
    return (
      <Route path="/" component={App}>
        <Route path="about/" component={About} />
      </Route>
    );
  }
};

export default Routes;