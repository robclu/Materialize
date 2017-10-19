import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'

import { fetchJsonInfo, FETCH_RESUME_INFO } from '../actions/index'

class Resume extends Component {
  constructor(props) {
    super(props);
    this.props.fetchJsonInfo(FETCH_RESUME_INFO, 'resume');
  }

  render() {
    return (
      <section id="resume">
      </section>
    )
  }
}

// Ensure that the theme is passed down to this class.
Resume.contextTypes = {
  muiTheme: PropTypes.object
};

function mapStateToProps(state) {
  return {
    jsonData: state.jsonInfo
  };
}

export default connect(mapStateToProps, { fetchJsonInfo })(Resume);