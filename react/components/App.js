
import React, { Component, Children, cloneElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header'
import Main   from './Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import { grey900,
         blue700,
         cyan400,
         blueGrey900,
         tealA700,
         white  ,
         fullBlack } from 'material-ui/styles/colors'

import About  from './About'
import Intro  from './Intro'
import Skills from './Skills'

const primaryColor     = tealA700;
const primaryDarkColor = blueGrey900;

const defaultTheme = getMuiTheme(lightBaseTheme, {
  palette: {
    primary1Color      : primaryColor,
    accent2Color       : grey900,
    textColor          : white,
    alternateTextColor : white,
  },
  toolbar: {
    backgroundColor : '',
    alternateColor  : primaryDarkColor
  },
  about: {
    backgroundColor : white,
    titleColor      : primaryColor
  },
  skills : {
    backgroundColor       : primaryColor,
    titleColor            : primaryDarkColor,
    accentColor           : primaryDarkColor
  }
})

// Add backgroundColor tag to Intro if no image is supplied
const App = () => (
  <div>
    <MuiThemeProvider muiTheme={defaultTheme}>
      <div>
        <Header/>
        <Main/>
        <Intro introText     = "Hello and Welcome, I am"
               mainText      = "Rob Clucas"
               backgroundImg = "static/img/backgrounds/IntroBackground.png"
               titles        = {["PhD Student"        ,
                                 "C++ Enthusiast"     ,
                                 "Graphics Enthusiast",
                                 "Developer"          ]}/>
        <About  />
        <Skills />
      </div>
    </MuiThemeProvider>
  </div>
)

export default App