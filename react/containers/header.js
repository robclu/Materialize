import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { fetchSiteInfo } from '../actions/index'
import FlatButton from 'material-ui/FlatButton'
import ToolbarItem from '../components/ToolbarItem'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, width: 1200, height: null }
  }

  render() {
    return (
      <Toolbar style={{height: '64px'}}>
        <ToolbarGroup>
          <FlatButton style={{height: '60px'}}>
            <img src="static/img/logo/BlogLogoSmall.png"/>
          </FlatButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem href="/" label="Home" />
          <ToolbarItem label="About" href="/about"/>
          <ToolbarItem label="Projects" href="/projects"/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.siteInfo.all };
}

export default connect(mapStateToProps, { fetchSiteInfo })(Header);