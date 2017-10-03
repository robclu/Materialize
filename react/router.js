import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

class App extends Component {
  render() {
    return (<div> Hello Word </div>);
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));