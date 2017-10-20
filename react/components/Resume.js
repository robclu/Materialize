import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'

import { fetchJsonInfo, FETCH_RESUME_INFO } from '../actions/index'

class ExperiencePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var theme     = this.props.theme;
    var horCenter = { margin : '0 auto' }
    return (
      <div className = "col s12 offset z-depth-2"
           style     = {{ borderRadius : '5px',
                          color        : theme.textColor,
                          padding      : 0
                        }}>
        <div className="z-depth-1" style={{ width : '100%' }}>
          <div className = "tabs vctr-content-m vctr-content-s"
              style     = {{ backgroundColor : theme.backgroundColor,
                             fontWeight      : '600'                }}>
            <div className = "tab col s10 m4 offset-s1" style={horCenter}>
              {this.props.data.name}
            </div>
            <div className="tab col s10 m4 offset-s1" style={horCenter}>
              {this.props.data.title}
            </div>
            <div className="tab col s10 m4 offset-s1" style={horCenter}>
              {this.props.data.time.start}
              <span style={{ paddingLeft : 10, paddingRight : 10}}>-</span>
              {this.props.data.time.end}
            </div>
          </div>
        </div>
        <div className="col s10 m8 offset-s1 offset-m2" style={{ paddingTop : 30 }}>
          <p style={{fontSize     : '22px',
                     fontWeight   : '500' ,
                     color        : '#666',
                     borderBottom : '1px solid rgba(0,0,0,.2)',
                     paddingBottom: '30px',
                     whiteSpace   : 'pre-wrap',
                     textAlign    : 'justify' }}>
            {String(this.props.data.description).replace(/\n/g,"\n\n")}
          </p>
        </div>
        <div className = "col s10 m8 offset-s1 offset-m2"
             style     = {{ paddingTop    : '10px',
                            paddingBottom : '10px' }}>
          <div className="vctr-content-m vctr-content-s">
            {
              this.props.data.skills.map(skill => {
                return (
                  <div className="vctr-content">
                    <span className = "resume-exp-skill z-depth-1"
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
      <div className = "tabs"
          style     = {{ backgroundColor : resTheme.backgroundColor,
                         marginBottom    : '80px',
                         borderBottom    : '2px solid rgba(43, 48, 72, 0.12)',
                         color           : resTheme.titleColor,
                         height          : '72px'
                      }}>
        <div className="tab col s6 hover-pointer" style={tabStyle}>
          <a className = "active" 
             style     = {activeStyle}>
            <i className = "material-icons resume-tab-icon"
               style     = {{ fontSize : '40px' }}>work</i>
            <span className='resume-tab-name-s resume-tab-name-m'>
              Experience
            </span>
          </a>
        </div>
        <div className = "tab col s6 hover-pointer" style={tabStyle}>
          <i className = "resume-tab-icon material-icons"
            style      = {{ fontSize : '40px' }}>school</i>
          <span className="resume-tab-name-s resume-tab-name-m">
            Education
          </span>
        </div>
      </div>
    )
  }

  activeTab() {
    var resumeData = this.props.jsonData.resume;
    if (!resumeData) {
      console.log("waiting!!");
      return;
    }

    var experience = Object.keys(resumeData.experience).map(k => { 
      return resumeData.experience[k];
    })

    var theme = this.context.muiTheme.resume;
    return (
        experience.map((exp, i) => {
          var opacity = (i === experience.length - 1) ? 0 : 1;
          return (
            <div>
              <div className="resume-tab-panel">
                <div className="row" style={{ marginBottom : 0 }}>
                  <ExperiencePanel data={exp} theme={theme} />

                </div>
              </div>
              <div className = "resume-tab-panel-timeline"
                   style     = {{ backgroundColor : theme.accentColor,
                                  opacity         : opacity }}>
              </div>
            </div>
          )
        })
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