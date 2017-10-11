import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { fetchSiteInfo } from '../actions/index'
import FlatButton from 'material-ui/FlatButton'

import ToolbarItem from './ToolbarItem'
import ToolbarLogo from './ToolbarLogo'

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar style={{position : 'fixed',
                       height   : '64px' ,
                       left     : '0'    ,
                       top      : '0'    ,
                       width    : '100%' ,
                       zIndex   : '99999'}}>
        <ToolbarGroup>
          <ToolbarLogo href="/" src="static/img/logo/BlogLogoSmall.png"/>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem label="Home"     href="/"/>
          <ToolbarItem label="About"    href="#about"/>
          <ToolbarItem label="Blog"     href="/blog"/>
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