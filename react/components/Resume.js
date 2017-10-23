import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'

import { fetchJsonInfo, FETCH_RESUME_INFO } from '../actions/index'

class EducationPanel extends Component {
  constructor(props) {
    super(props);
  }

  renderCourses() {
    var theme = this.props.theme;
    return (
      <div className = "row"
           style     = {{ color   : theme.accentColor }}>
      {
        this.props.data.courses.map(course => {
          return (
            <div className="col s6 xl3">
              <div className="vctr-content" style={{ margin : 5, height : '60px' }}>
                <span className = "resume-edu-course resume-edu-course-l">
                  {course}
                </span>
              </div>
            </div>
          )
        })
      }
      </div>
    )
  }

  render() {
    var theme      = this.props.theme;
    var boardStyle = { 
      color           : theme.textColor,
      backgroundColor : theme.backgroundColor,
      padding         : '0' 
    }
    var headingStyle = {
      color : theme.titleColor
    }

    return (
      <div className="col s12 z-depth-2 board" style={boardStyle}>
        <div className="row z-depth-1">
          <div className = "board-header vctr-content-m vctr-content-s"
               style     = {{ backgroundColor : theme.backgroundColor }}>
            <div className = "col s10 l4 offset-s1 board-header-item">
              {this.props.data.uni}
            </div>
            <div className = "col s10 l4 offset-s1 board-header-item">
              {this.props.data.degree}
            </div>
           <div className = "col s10 l4 offset-s1 board-header-item">
              {this.props.data.date.start}
              <span style={{ paddingLeft : 10, paddingRight : 10}}>-</span>
              {this.props.data.date.end}
            </div>
          </div>       
        </div>
        <div className="col s10 offset-s1 board-content-no-border">
          <div className="board-content-heading" style={headingStyle}>
            <span className="board-content-heading-title">GPA</span>
            <span className="board-content-heading-sep">:</span>
            <span className="board-content-heading-info">
              {this.props.data.gpa}
            </span>
          </div>
        </div>
        <div className="col s10 offset-s1 board-content">
          <div className="board-content-heading" style={headingStyle}>
            <span className="board-content-heading-title">Thesis</span>
            <span className="board-content-heading-sep">:</span>
            <span className="board-content-heading-info">
              {this.props.data.thesis.title}
            </span>
          </div>
        </div>
        <div className="col s10 offset-s1">
          <div className="board-content-heading" style={headingStyle}>
            Courses:
          </div>
          {
            this.renderCourses()
          }
        </div>
      </div>

    )
  }
}

class ExperiencePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var theme      = this.props.theme;
    var boardStyle = { 
      color           : theme.textColor,
      backgroundColor : theme.backgroundColor,
      padding         : '0' 
    }

    return (
      <div className="col s12 z-depth-2 board" style={boardStyle}>
        <div className="row z-depth-1">
          <div className = "board-header vctr-content-m vctr-content-s"
               style     = {{ backgroundColor : theme.backgroundColor }}>
            <div className = "col s10 l4 offset-s1 board-header-item">
              {this.props.data.name}
            </div>
            <div className = "col s10 l4 offset-s1 board-header-item">
              {this.props.data.title}
            </div>
            <div className = "col s10 l4 offset-s1 board-header-item">
              {this.props.data.time.start}
              <span style={{ paddingLeft : 10, paddingRight : 10}}>-</span>
              {this.props.data.time.end}
            </div>
          </div>
        </div>
        <div className="col s10 offset-s1 board-content">
          <p>
            {String(this.props.data.description).replace(/\n/g,"\n\n")}
          </p>
        </div>
        <div className = "col s10 offset-s1">
          <div className="vctr-content-m vctr-content-s hctr-content board-tags">
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
    this.tabTypes  = { experience : 0, education : 1 };
    this.state     = {
      activeTab : this.tabTypes.experience
    };

    this.handleExpClick = () => {
      this.setState({ activeTab : this.tabTypes.experience });
    }
    this.handleEduClick = () => {
      this.setState({ activeTab : this.tabTypes.education });
    }
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
      height       : '100%',
      transition   : 'all 0.4s linear'
    }
    var inactiveStyle = {
      color      : resTheme.titleColor,
      height     : '100%',
      transition : 'all 0.4s linear'
    }
    var tabStyle = { height : '100%' }
    var expClass = ''           , eduClass = '',
        expStyle = inactiveStyle, eduStyle = inactiveStyle;
    if (this.state.activeTab === this.tabTypes.experience) {
      expClass = 'active'; expStyle = activeStyle;
    } else {
      eduClass = 'active'; eduStyle = activeStyle;
    }

    return (
      <div className = "tabs"
          style     = {{ backgroundColor : resTheme.backgroundColor,
                         marginBottom    : '80px',
                         borderBottom    : '2px solid rgba(43, 48, 72, 0.12)',
                         color           : resTheme.titleColor,
                         height          : '72px'
                      }}>
        <div className = "tab col s6 hover-pointer"
             style     = {tabStyle}
             onClick   = {this.handleExpClick}>
          <a className={expClass} style={expStyle}> 
            <i className = "material-icons resume-tab-icon"
               style     = {{ fontSize : '40px' }}>work</i>
            <span className='resume-tab-name-s resume-tab-name-m'>
              Experience
            </span>
          </a>
        </div>
        <div className = "tab col s6 hover-pointer"
             style     = {tabStyle}
             onClick   = {this.handleEduClick}>
          <a className={eduClass} style={eduStyle}> 
            <i className = "resume-tab-icon material-icons"
              style      = {{ fontSize : '40px' }}>school</i>
            <span className="resume-tab-name-s resume-tab-name-m">
              Education
            </span>
          </a>
        </div>
      </div>
    )
  }

  getTabContent(experience, education) {
    var theme = this.context.muiTheme.resume;
    var expClass = this.state.activeTab === this.tabTypes.experience
                 ? 'resume-container-active' : 'resume-container-inactive';
    var eduClass = this.state.activeTab === this.tabTypes.education
                 ? 'resume-container-active' : 'resume-container-inactive';

    var getContent = (data, theme) => {
      return this.state.activeTab === this.tabTypes.experience
        ? <ExperiencePanel data={data} theme={theme} />
        : <EducationPanel data={data} theme={theme} />
    }

    return (
      <div className="resume-content-container">
      <div className={expClass}>
      {
        experience.map((element, i) => {
          var opacity = (i === experience.length - 1) ? 0 : 1;
          return (
            <div>
              <div className="resume-panel">
                <div className="row" style={{ marginBottom : 0 }}>
                  <ExperiencePanel data={element} theme={theme} />
                </div>
              </div>
              <div className = "resume-tab-panel-timeline z-depth-1"
                   style     = {{ backgroundColor : theme.accentColor,
                                  opacity         : opacity }}>
              </div>
            </div>
          )
        })
      }
      </div>
      <div className={eduClass}>
      {
        education.map((element, i) => {
          var opacity = (i === education.length - 1) ? 0 : 1;
          return (
            <div>
              <div className="resume-panel">
                <div className="row" style={{ marginBottom : 0 }}>
                  <EducationPanel data={element} theme={theme} />
                </div>
              </div>
              <div className = "resume-tab-panel-timeline z-depth-1"
                   style     = {{ backgroundColor : theme.accentColor,
                                  opacity         : opacity }}>
              </div>
            </div>
          )
        })
      }
      </div>
      </div>
    )
  }

  sections() {
    var resumeData = this.props.jsonData.resume;
    if (!resumeData) {
      console.log("waiting!!");
      return;
    }

    var objToArray = (data) => {
      return Object.keys(data).map(k => { return data[k]; })
    }

    var experience = objToArray(resumeData.experience);
    var education  = objToArray(resumeData.education);

    console.log(experience);
    return (
      <div className="row">
        <div className="col s12 m10 l8 offset-m1 offset-l2">
        {
          this.tabs()
        }
        {
          this.getTabContent(experience, education)
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