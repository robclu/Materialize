import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { Tab, Tabs } from 'material-ui/Tabs'
import { fetchSiteInfo } from '../actions/index'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { blueA400, fullBlack } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import simpleAssign from 'simple-assign';

const toolbarItemStyle = {
  margin: '0 auto'
};

const toolbarStyle = {
  height: '64px'
};

const iconButtonStyle = {
  height: '60px'
};

const toolbarLinkStyle = {
  position      :'relative'  ,
  paddingLeft   :'16px'      ,
  paddingRight  : '16px'     ,
  verticalAlign : 'middle'   ,
  letterSpacing : '0px'      ,
  textTransform : 'uppercase',
  fontWeight    : '500'      ,
  fontSize      : '14px'
};

class ToolbarLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered           : false,
      isKeyboardFocused : false,
      animating         : false,
      animated          : false
    };
    this.handleMouseEnter = (event) => {
      if (!this.state.animating || this.state.animated) {
        this.setState({ hovered: true, animating: true });
      }
      this.props.onMouseEnter(event);
    }
    this.handleMouseLeave = (event) => {
      this.setState({ hovered: false });
      this.props.onMouseLeave(event);
    }
    this.handleKeyboardFocus = (event, isKeyboardFocused) => {
      this.setState({ isKeyboardFocused: isKeyboardFocused });
      this.props.onKeyboardFocus(event, isKeyboardFocused);
    }
  }

  componentDidMount() {
    var onAnimationEnd = () => {
      this.setState({ animating : false,
                      animated  : true,
                      hovered   : this.state.hovered });
    }
    this.link.addEventListener('animationend'  , onAnimationEnd);
    this.link.addEventListener('transitionend', onAnimationEnd);
  }

  render() {
    var muiTheme       = this.context.muiTheme,
        buttonHeight   = muiTheme.button.height,
        buttonMinWidth = muiTheme.button.minWidth,
        buttonColor    = muiTheme.baseTheme.palette.textColor,
        buttonHovColor = muiTheme.baseTheme.palette.primary1Color,
        backgroundColor= muiTheme.toolbar.backgroundColor,
        fontSize       = muiTheme.flatButton.fontSize,
        fontWeight     = muiTheme.flatButton.fontWeight,
        hovered        = this.state.hovered || this.state.isKeyboardFocused,
        color          = (hovered || this.state.animating) ? buttonHovColor : buttonColor;

    var style = {
      border          : muiTheme.button.height,
      borderRadius    : muiTheme.borderRadius ,
      height          : buttonHeight,
      lineHeight      : buttonHeight + 'px',
      minWidth        : buttonMinWidth,
      color           : color,
      backgroundColor : backgroundColor,
      textTransform   : 'uppercase',
      fontWeight      : fontWeight,
      fontSize        : fontSize,
      padding         : 0,
      margin          : 0,
      fontFamily      : muiTheme.baseTheme.fontFamily,
      textDecoration  : 'none',
      textAlign       : 'center'
    };

    var prepareStyles = this.context.muiTheme.prepareStyles;
    var internalStyle = {
      position     : 'relative',
      paddingLeft  : this.context.muiTheme.baseTheme.spacing.desktopGutterLess,
      paddingRight : this.context.muiTheme.baseTheme.spacing.desktopGutterLess,
      verticalAlign: 'middle'
    };

    var className = (hovered || this.state.animating) ? "toolbar-item" : "";
    var finalStyle = this.context.muiTheme.prepareStyles(internalStyle);
    return(
      <a href={this.props.href}
         className={className}
         ref={(link) => { this.link = link}}
         style={style}
         onMouseEnter={this.handleMouseEnter}
         onMouseLeave={this.handleMouseLeave}>
        <div><span style={finalStyle}>{this.props.label}</span></div>
      </a>
    )
  }
}

ToolbarLink.defaultProps = {
  href: "",
  onKeyboardFocus : () => {},
  onMouseEnter    : () => {},
  onMouseLeave    : () => {}
};

ToolbarLink.contextTypes = {
  muiTheme: PropTypes.object
};

ToolbarLink.propTypes = {
  href           : PropTypes.string,
  label          : PropTypes.string,
  onKeyboardFocus: PropTypes.func,
  onMouseEnter   : PropTypes.func,
  onMouseLeave   : PropTypes.func
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, width: 1200, height: null }
  }

  render() {
    return (
      <Toolbar style={toolbarStyle}>
        <ToolbarGroup>
          <FlatButton style={iconButtonStyle}>
            <img src="static/img/logo/BlogLogoSmall.png"/>
          </FlatButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarLink href="/" label="Home" />
          <FlatButton label="About" href="/about"/>
          <FlatButton label="Projects" href="/projects"/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.siteInfo.all };
}

export default connect(mapStateToProps, { fetchSiteInfo })(Header);