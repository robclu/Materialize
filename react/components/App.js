
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
import Resume from './Resume'
import Skills from './Skills'

const primaryColor       = tealA700;
const primaryAccentColor = '#f7f7f7';
const primaryDarkColor   = blueGrey900;

const defaultTheme = getMuiTheme(lightBaseTheme, {
  palette: {
    primary1Color      : primaryColor,
    accent2Color       : grey900,
    textColor          : primaryAccentColor,
    alternateTextColor : primaryAccentColor,
  },
  toolbar: {
    backgroundColor : ''                ,
    textColor       : primaryAccentColor,
    itemHoverColor  : primaryColor      ,
    alternateColor  : primaryDarkColor
  },
  about: {
    backgroundColor : primaryAccentColor,
    titleColor      : primaryColor
  },
  skills : {
    backgroundColor : primaryColor,
    titleColor      : primaryDarkColor,
    accentColor     : primaryDarkColor
  },
  resume : {
    backgroundColor : primaryAccentColor,
    titleColor      : primaryDarkColor  ,
    accentColor     : primaryColor      ,
    cardColor       : primaryDarkColor
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
        <Resume />
      </div>
    </MuiThemeProvider>
  </div>
)

export default App