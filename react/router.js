import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import promise from 'redux-simple-promise';

import reducers from './reducers';
import App      from "./components/app";

const createStoreWithMiddleWare = applyMiddleware(promise())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));