import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'

import { fetchJsonInfo, FETCH_RESUME_INFO } from '../actions/index'

class ExperiencePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var theme = this.props.theme;
    console.log(theme)
    return (
      <div className = "col s12 offset z-depth-2"
           style     = {{ borderRadius : '5px',
                          color        : theme.textColor,
                          padding      : 0
                        }}>
        <div className="z-depth-1" style={{ width        : '100%',
                      borderBottom : '1px solid' }}>
          <ul className = "tabs"
              style     = {{ backgroundColor : theme.backgroundColor,
                             fontWeight      : '600'                }}>
            <li className="tab col s4">
              {this.props.data.name}
            </li>
            <li className="tab col s4">
              {this.props.data.title}
            </li>
            <li className="tab col s4">
              {this.props.data.time.start}
              <span style={{ paddingLeft : 10, paddingRight : 10}}>-</span>
              {this.props.data.time.end}
            </li>
          </ul>
        </div>
        <div className="col s10 m8 offset-s1 offset-m1" style={{ paddingTop : 30 }}>
          <p style={{fontSize     : '19px',
                     fontWeight   : '400' ,
                     color        : '#666',
                     borderBottom : '1px solid rgba(0,0,0,.2)',
                     paddingBottom: '30px',
                     whiteSpace   : 'pre-wrap',
                     textAlign    : 'justify' }}>
            {String(this.props.data.description).replace(/\n/g,"\n\n")}
          </p>
        </div>
        <div className="col s10 m1 offset-s1 offset-m1" style={{ paddingTop : 30 }}>
          <div>
              {
                this.props.data.skills.map(skill => {
                  return (
                    <div style={{ display : 'flex', alignItems : 'center' }}>
                      <span className = "resume-exp-skill"
                            style     = {{ backgroundColor : theme.accentColor }}>
                        {skill}
                      </span>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </div>
    )
  }
}

class Resume extends Component {
  constructor(props) {
    super(props);
    this.props.fetchJsonInfo(FETCH_RESUME_INFO, 'resume');
  }

  heading() {
    return (
      <div className="text-center section-heading mb-m80 mb-s45 mb-xs30">
        <h2 style={{ color : this.context.muiTheme.resume.titleColor }}>
          Resume
        </h2>
      </div>
    )
  }

  tabs() {
    var resTheme     = this.context.muiTheme.resume;
    var activeStyle = {
      color        : resTheme.accentColor,
      borderBottom : '5px solid ' + resTheme.accentColor,
      height       : '100%'
    }
    var tabStyle = { height : '100%' }
    return (
      <ul className = "tabs"
          style     = {{ backgroundColor : resTheme.backgroundColor,
                         marginBottom    : '40px',
                         borderBottom    : '2px solid rgba(43, 48, 72, 0.12)',
                         color           : resTheme.titleColor,
                         height          : '72px'
                      }}>
        <li className="tab col s10 m6 hover-pointer" style={tabStyle}>
          <a className = "active" 
             style     = {activeStyle}>
            <i className = "material-icons resume-tab-icon"
               style     = {{ fontSize : '40px' }}>work</i>
            <span className='resume-tab-name'>
              Experience
            </span>
          </a>
        </li>
        <li className = "tab col s10 m6 hover-pointer" style={tabStyle}>
          <i className = "resume-tab-icon material-icons"
            style      = {{ fontSize : '40px' }}>school</i>
          <span className="resume-tab-name">
            Education
          </span>
        </li>
      </ul>
    )
  }

  activeTab() {
    if (!this.props.jsonData.resume) {
      console.log("waiting!!");
      return;
    }

    return (
      <div className="resume-tab-panel">
        <div className="row">
          <ExperiencePanel data  = {this.props.jsonData.resume.experience.netronome}
                           theme = {this.context.muiTheme.resume} />
        </div>
      </div>
    )
  }

  sections() {
    return (
      <div className="row">
        <div className="col s10 offset-s1">
        {
          this.tabs()
        }
        {
          this.activeTab()
        }
        </div>
      </div>

    )
  }
  render() {
    var theme = this.context.muiTheme;
    return (
      <section id        = "resume"
               className = "section-padding"
               style     = {{ backgroundColor : theme.resume.backgroundColor }}>
        <container>
          {
            this.heading()
          }
          {
            this.sections()
          }
        </container>
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