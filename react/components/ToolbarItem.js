import React, { Component } from 'react';
import PropTypes from 'prop-types';
import simpleAssign from 'simple-assign';

class ToolbarItem extends Component {
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
                      animated  : true ,
                      hovered   : this.state.hovered });
    }
    this.link.addEventListener('animationend' , onAnimationEnd);
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
        color          = (hovered || this.state.animating) 
        							 ? buttonHovColor : buttonColor;

    var outerStyle = {
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

    var spanStyle = {
      position     : 'relative',
      paddingLeft  : this.context.muiTheme.baseTheme.spacing.desktopGutterLess,
      paddingRight : this.context.muiTheme.baseTheme.spacing.desktopGutterLess,
      verticalAlign: 'middle'
    };

    var className = (hovered || this.state.animating) ? "toolbar-item" : "";
    return(
      <a href 		    = {this.props.href}
         className    = {className}
         ref     		  = {(link) => { this.link = link}}
         style        = {outerStyle}
         onMouseEnter = {this.handleMouseEnter}
         onMouseLeave = {this.handleMouseLeave}
      >
        <div>
        	<span style={this.context.muiTheme.prepareStyles(spanStyle)}>
        		{this.props.label}
        	</span>
        </div>
      </a>
    )
  }
}

ToolbarItem.defaultProps = {
  href: "",
  onKeyboardFocus : () => {},
  onMouseEnter    : () => {},
  onMouseLeave    : () => {}
};

ToolbarItem.contextTypes = {
  muiTheme: PropTypes.object
};

ToolbarItem.propTypes = {
  href           : PropTypes.string,
  label          : PropTypes.string,
  onKeyboardFocus: PropTypes.func,
  onMouseEnter   : PropTypes.func,
  onMouseLeave   : PropTypes.func
};

export default ToolbarItem;