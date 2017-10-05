
import React, { Component, Children, cloneElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../containers/header'
import Main   from './Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import { grey900, white } from 'material-ui/styles/colors'

const defaultTheme = getMuiTheme(lightBaseTheme, {
  palette: {
    accent2Color       : grey900,
    textColor          : white,
    alternateTextColor : white,
  }
})

const App = () => (
  <div>
    <MuiThemeProvider muiTheme={defaultTheme}>
      <div>
        <Header/>
        <Main/>
      </div>
    </MuiThemeProvider>
  </div>
)

export default App