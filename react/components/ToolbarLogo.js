import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ToolbarLogo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={this.props.href}>
        <img src={this.props.src} />
      </a>  
    )
  }
}

ToolbarLogo.propTypes = {
  href : PropTypes.string,
  src  : PropTypes.string.isRequired
};

ToolbarLogo.defaultProps = {
  href : "/"
};

export default ToolbarLogo;