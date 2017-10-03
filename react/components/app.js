
import React, { Component, Children, cloneElement } from 'react';

//MUI React Library
import { //dark theme
  green900, green500, green800,
  teal900, teal500,
  blueGrey800,
  grey50,
  cyan500,
  //light theme
  grey300, grey400
} from 'material-ui/styles/colors'; //dark theme

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

//import Header from '../containers/header';
//import Footer from '../containers/footer';

//style overrides
const darkMuiTheme = getMuiTheme(darkBaseTheme, {
  palette: {
    primary1Color: blueGrey800,
    primary2Color: green900,
    primary3Color: teal900,
    accent1Color: green500,
    accent2Color: teal500,
    accent3Color: cyan500,
    textColor: grey50,
    alternateTextColor: grey50, //color on header
    //pickerHeaderColor: grey900
  },
  appBar: {
    height: 100
  },
  toggle: {
    thumbDisabledColor: green900,
    trackOffColor: blueGrey800,
    trackOnColor: green900,
    trackDisabledColor: green800,
    thumbOnColor: green900
  }
});

const lightMuiTheme = getMuiTheme(null, {
  pallete: {
    primary1Color: teal500,
    primary2Color: grey300,
    primary3Color: cyan500,
    accent1Color: blueGrey800,
    accent2Color: green900,
    accent3Color: teal900
  },
  appBar: {
    height: 100,
    color: teal500
  },
  toggle: {
    thumbDisabledColor: green900,
    trackOffColor: blueGrey800,
    trackOnColor: green900,
    trackDisabledColor: green800,
    thumbOnColor: green900
  },
  paper: {
    backgroundColor: grey300
  },
  drawer: {
    color: grey300
  },
  chip: {
    backgroundColor: grey400
  },
  raisedButton: {
    secondaryColor: cyan500
  }
});


export default class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            Hello, World!
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}