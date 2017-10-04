
import React, { Component, Children, cloneElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../containers/header'
import Main   from './Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

const toolbarStyle = {
  palette: {
    alternateTextColor: blueA400,
    pickerHeaderColor: blueA400,
    primary3Color: blueA400,
    accent2
  }
};

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <Header/>
        <Main/>
      </div>
    </MuiThemeProvider>
  </div>
)

export default App