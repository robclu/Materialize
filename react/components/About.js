import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { fetchJsonInfo }    from '../actions/index'
import Paper                from 'material-ui/Paper'
import PropTypes from 'prop-types'

class AboutInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.about.description);
    var d = String(this.props.about.description);
    var x = d.replace(/\n/g,"\n\n");
    console.log(x);
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
          <p style={{fontSize     : '18',
                     fontWeight   : '300' ,
                     fontStyle    : 'italic',
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

            var iconClass = "fa fa-" + key;
            return (
              <li>
                <a href      = {this.props.about[key]}
                   className = "btn-floating btn-large waves-effect waves-light white">
                  <i className={iconClass}
                     style={{color : this.props.theme.about.titleColor}}/>
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
    this.props.fetchJsonInfo('about');
  }

  render() {
    // Run spinner to show that data is being fetched.
    if (!this.props.aboutJsonData) {
      console.log("waiting!!");
      return;
    }

    var theme = this.context.muiTheme;
    var about = this.props.aboutJsonData.data;
    return (
      <div className="container"
           style    ={{ backgroundColor: theme.about.backgroundColor}}>
        <div className="row">
          <div className="col s6 m4 offset-m1">
            <div className="profile-image">
              <img src={this.props.profileImage} />
            </div>
          </div>
          <div className="col s6 m5 offset-m1">
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
    aboutJsonData: state.jsonInfo
  };
}

export default connect(mapStateToProps, { fetchJsonInfo })(About);