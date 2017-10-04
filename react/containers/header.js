import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { Tab, Tabs } from 'material-ui/Tabs'
import { fetchSiteInfo } from '../actions/index'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { blueA400 } from 'material-ui/styles/colors';

const toolbarStyle = {
  palette: {
    alternateTextColor: blueA400,
    pickerHeaderColor: blueA400,
    primary3Color: blueA400
  }
};

const toolbarItemStyle = {
  margin: '0 auto'
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, width: 1200, height: null }
  }

  render() {
    return (
      <Toolbar style={toolbarStyle}>
        <ToolbarGroup style={toolbarItemStyle}>
          <FlatButton label="Home" href="/"/>
          <FlatButton label="About" href="/about"/>
          <FlatButton label="Projects" href="/projects"/>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            href="https://github.com"
            target="_blank"
            secondary={true}
            icon={<FontIcon className="muidocs-icon-custom-github"/>}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.siteInfo.all };
}

export default connect(mapStateToProps, { fetchSiteInfo })(Header);