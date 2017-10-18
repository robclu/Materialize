import React, { Component }      from 'react'
import { connect }               from 'react-redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import PropTypes                 from 'prop-types'

import { fetchSiteInfo } from '../actions/index'
import ToolbarItem       from './ToolbarItem'
import ToolbarLogo       from './ToolbarLogo'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollAmount : 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', (event) => {
      this.setState({ scrollAmount : event.target.scrollingElement.scrollTop });
    })
  }

  render() {
    var muiTheme         = this.context.muiTheme;
    var backgroundColor  = '';
    var toolbarClassName = '';

    if (this.state.scrollAmount > 1000) { 
      backgroundColor  = muiTheme.toolbar.alternateColor;
      toolbarClassName = 'z-depth-2';
    }

    return (
      <Toolbar className = {toolbarClassName}
               style     = {{ position        : 'fixed'        ,
                              height          : '100px'        ,
                              left            : '0'            ,
                              top             : '0'            ,
                              width           : '100%'         ,
                              backgroundColor : backgroundColor,
                              zIndex          : '99999'        ,
                              transition      : 'background-color 0.2s ease-in'}}>
        <ToolbarGroup>
          <ToolbarLogo href="/" src="static/img/logo/BlogLogoLarger.png"/>
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

Header.contextTypes = {
  muiTheme: PropTypes.object
};

function mapStateToProps(state) {
  return { config: state.siteInfo.all };
}

export default connect(mapStateToProps, { fetchSiteInfo })(Header);