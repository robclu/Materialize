import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { fetchJsonInfo, FETCH_ABOUT_INFO } from '../actions/index'
import PropTypes from 'prop-types'

class AboutInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-info">
        <div style={{marginBottom : '20px', marginTop : '25px'}}>
          <h2 style={{ textTransform : 'uppercase',
                       marginBottom  : '25px'     ,
                       fontWeight    : '900'      ,
                       fontSize      : '40'       ,
                       color         : this.props.theme.about.titleColor }}>
            About
          </h2>
          <p style={{fontSize     : '19px',
                     fontWeight   : '400' ,
                     color        : '#666',
                     borderBottom : '1px solid rgba(0,0,0,.2)',
                     paddingBottom: '30px',
                     whiteSpace   : 'pre-wrap',
                     textAlign    : 'justify' }}>
            {String(this.props.about.description).replace(/\n/g,"\n\n")}
          </p>
        </div>
        <ul style={{borderBottom : "1px solid rgba(0, 0, 0, 0.2)",
                    width        : '-webkit-fill-available'}}>
          <li><span>Name:</span>{this.props.about.name}</li>
          <li><span>Email:</span>{this.props.about.email}</li>
          <li><span>Address:</span>{this.props.about.location}</li>
          <li><span>Phone:</span>{this.props.about.phone}</li>
        </ul>
      </div>
    )
  }
}

class AboutSocial extends Component {
  constructor(props) {
    super(props);
    this.filters = ["github"        ,
                    "linkedin"      ,
                    "stack-overflow",
                    "facebook"      ,
                    "twitter"       ,
                    "instagram"     ,
                    "reddit"        ,
                    "youtube"       ,
                    "google-plus"   ,];
  }

  render() {
    var keys = Object.keys(this.props.about);
    var matchingKeys = this.filters.map(filter => {
      return keys.filter(key => {
        return key.indexOf(filter) !== -1;
      });
    });
  
    if (matchingKeys.length === 0) {
      return <div></div>;
    }
    return (
      <div className="profile-social">
        <ul>
        {
          matchingKeys.map(key => {
            if (key.length === 0) {
              return;
            }

            var iconClass = "fa fa-" + key + ' hoverable';
            var theme     = this.props.theme;
            return (
              <li>
                <a href      = {this.props.about[key]}
                   className = "btn-floating btn-large waves-effect waves-light white">
                  <i className={iconClass}
                     style={{ color           : theme.about.titleColor,
                              backgroundColor : theme.about.backgroundColor }}/>
                </a>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

class About extends Component {
  constructor(props) {
    super(props);
    this.props.fetchJsonInfo(FETCH_ABOUT_INFO, 'about');
  }

  render() {
    // Run spinner to show that data is being fetched.
    if (!this.props.jsonData.about) {
      console.log("waiting!!");
      return;
    }

    var theme = this.context.muiTheme;
    var about = this.props.jsonData.about;
    return (
      <div className = "container"
           id        = "about"
           style     = {{ backgroundColor: theme.about.backgroundColor}}>
        <div className="row">
          <div className="col s12 m8 l6 offset-m2 offset-l3">
            <AboutInfo about={about} theme={theme} />
            <AboutSocial about={about} theme={theme} />
          </div>
        </div>
      </div>
    )
  }
}

About.contextTypes = {
  muiTheme: PropTypes.object
};

function mapStateToProps(state) {
  return {
    jsonData: state.jsonInfo
  };
}

export default connect(mapStateToProps, { fetchJsonInfo })(About);