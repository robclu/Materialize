import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { fetchPage }        from '../actions/index';
import { Page }             from '../components/Page';

class About extends Component {
  componentWillMount() {
    this.props.fetchPage('About', '/about/');
  }

  render() {
    if (!this.props.pageInfo) {
      return (
        <div> Loading </div>
      );
    }
        console.log(this.props.pageInfo.title);
    console.log(this.props.pageInfo.body);
    return (
      <Page title={this.props.pageInfo.title} content={this.props.pageInfo.body} />
    );
  }
}

function mapStateToProps(state) {
  return {
    pageInfo: state.posts.page
  };
}

export default connect(mapStateToProps, { fetchPage })(About);