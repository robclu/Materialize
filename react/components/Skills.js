import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'

import { fetchJsonInfo, FETCH_SKILLS_INFO } from '../actions/index'

class SingleSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed : false
    };
  
    this.handleClick = () => {
      this.setState({ revealed: !this.state.revealed });
    }

    this.outerStyle = {
      margin          : '20'                  ,
      width           : this.props.size + 'px',
      height          : this.props.size + 'px',
      borderRadius    : '10px'                ,
      transition      : 'all 0.5s linear'     ,
      backgroundColor : this.props.theme.skills.accentColor
    };

    this.shiftWidth   = 40;
    this.opacityScale = 0.9;
  }

  getStyle() {
    var shift   = this.props.shift * (-this.props.size - this.shiftWidth);
    var tform   = 'scale(' + this.props.scale + ')';
    var opacity = this.props.scale < this.opacityScale ? 0 : 1;
    return Object.assign({ left      : shift   , 
                           transform : tform   ,
                           opacity   : opacity }, this.outerStyle);

  }

  renderSkillInfo(accentColor, backgroundColor) {
    return (
      <div className = "card hover-pointer hover-up"
           onClick   = {this.handleClick}
           style     = {this.getStyle()}>
        <div className="center-helper-header"></div>
        <div className = "skill-title" 
             style     = {{ color    : backgroundColor,
                            fontSize : '28px'         }}>
          {this.props.skillName}
        </div>
        <div className="skill-info-list separator">
          <ul style={{ columns: this.props.columns }}>
          {
            this.props.skillFiller.map(fillerName => {
              return (
                <li className = "fader"
                    style     = {{ color     : backgroundColor,
                                   textAlign : 'center' }}>
                  {fillerName}
                </li>
              );
            })
          }
          </ul> 
        </div>
      </div>
    )
  }

  renderSkillTitle(accentColor, backgroundColor) {
    var className = "card hover-up";
    var onClick   = () => {};

    if (this.props.skillFiller.length > 0) {
      className += " hover-pointer";
      onClick    = this.handleClick;
    }

    return (
      <div className = {className}
           onClick   = {onClick}
           style     = {this.getStyle()}>
        <div className="center-helper">
        </div>
        <div className = "skill-title"
             style     = {{ color  : backgroundColor }}>
          {this.props.skillName}
        </div>
        <div className="fader separator"
             style={{ padding       : 'unset'        ,
                      paddingTop    : '10px'         ,
                      width         : '100%'         ,
                      textAlign     : 'center'       ,
                      color         : backgroundColor, 
                      textTransform : 'uppercase'    ,
                      fontWeight    : '600'          ,
                      fontSize      : '20px'         }}>
          <span style={{ color : backgroundColor }}>
            {this.props.skillLevel}
          </span>
        </div>
      </div>
    )
  }

  render() {
    var accentColor     = this.props.theme.skills.accentColor;
    var backgroundColor = this.props.theme.skills.backgroundColor;
    return this.state.revealed 
      ? this.renderSkillInfo(accentColor, backgroundColor)
      : this.renderSkillTitle(accentColor, backgroundColor);
  }
}

class Skills extends Component {
  constructor(props) {
    super(props);
    this.props.fetchJsonInfo(FETCH_SKILLS_INFO, 'skills');

    this.tabs  = { languages : 0, tools : 1 };
    this.state = {
      skillsStartIndex : 0,
      skillTabIndex    : this.tabs.languages
    };

    // Properties of the skill to view;
    this.scaleAmount          = 0.5;
    this.skillsInView         = 3;
    this.skillSize            = 260;
    this.skillContainerWidth  = '95%';
    this.skillContainerHeight = '70%';

    // Values for the level of a skill:
    this.capable = 5;
    this.good    = 7;

    // Callbacks:
    this.handleShiftRight = () => {
      var languages = this.props.jsonData.skills.languages;
      var finalIndex = this.state.skillsStartIndex + this.skillsInView;
      if (finalIndex >= Object.keys(languages).length) {
        return;
      }
      this.setState({ skillsStartIndex : this.state.skillsStartIndex + 1 });
    }

    this.handleShiftLeft = () => {
      if (this.state.skillsStartIndex === 0) {
        return;
      } 
      this.setState({ skillsStartIndex : this.state.skillsStartIndex - 1 });
    }

    this.handleLanguageSkillChange = () => {
      this.setState({ skillTabIndex : this.tabs.languages });
    }

    this.handleToolSkillChange = () => {
      this.setState({ skillTabIndex : this.tabs.tools });
    }
  }

  // This returns a sorted array of array, from highest level to lowest level.
  // The array elements are array with the following properties:
  // [
  //  0 : level value
  //  1 : Name of item with level value
  //  2 : additional properties from the object
  // ]
  sortByLevel(data) {
    var sorted = []
    for (var element in data) {
      sorted.push([data[element].level, element, data[element]]);
    }
    sorted.sort((a, b) => {
      return b[0] - a[0];
    });
    return sorted;
  }

  createTab(skills) {
    return (
      <div className="skills-container">
        <div className="skills-outer">
          <div className="skills-wrapper">
          {
            skills.map((skillItem, i) => {
              var skill   = skillItem[2];
              var filler = []
              if (skill.hasOwnProperty("libraries")) { 
                filler = skill.libraries;
              }

              var level = 'Proficient'
              if (skill.level <= this.capable)   { level = 'Capable'; }
              else if (skill.level <= this.good) { level = 'Good';    }

              var columns = 1
              if (skill.hasOwnProperty('columns')) {
                columns = skill.columns;
              }

              var scale = 1.0;
              if (i < this.state.skillsStartIndex ||
                  i >= this.state.skillsStartIndex + this.skillsInView) {
                scale = this.scaleAmount;
              }
              return <SingleSkill skillName   = {skillItem[1]} 
                                  skillFiller = {filler}
                                  skillLevel  = {level}
                                  scale       = {scale}
                                  size        = {this.skillSize}
                                  columns     = {columns}
                                  shift       = {this.state.skillsStartIndex}
                                  theme       = {this.context.muiTheme}/>
            })
          }
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.jsonData.skills) {
      console.log("waiting!!");
      return;
    }

    var theme     = this.context.muiTheme;
    var skills = this.state.skillTabIndex === this.tabs.languages
               ? this.sortByLevel(this.props.jsonData.skills.languages)
               : this.sortByLevel(this.props.jsonData.skills.tools);
    
    var startIndex = this.state.skillsStartIndex + this.skillsInView;
    var start      = (startIndex > skills.length) 
                   ? skills.length - this.skillsInView 
                   : this.state.skillsStartIndex;

    var cursorLeft  = this.state.skillsStartIndex > 0
                    ? 'pointer' : 'not-allowed';
    var cursorRight = startIndex !== skills.length
                    ? 'pointer' : 'not-allowed';

    var langHighlight = this.state.skillTabIndex === this.tabs.languages
                      ? '4px solid ' + theme.skills.accentColor : '';
    var toolHighlight = this.state.skillTabIndex === this.tabs.tools
                      ? '4px solid ' + theme.skills.accentColor : '';

    return (
      <div className = "container"
           id        = "skills"
           style     = {{ backgroundColor : theme.skills.backgroundColor }}>
        <div className="row">
          <div className="col s12 m3 offset-m1">
            <div className="section-heading">
              <h2 style={{ color : theme.skills.titleColor }} >
                Skills
              </h2>
              <p style={{ color: theme.skills.titleColor }}>
                {this.props.jsonData.skills.description}
              </p>
            </div>
          </div>
          <div className="col s12 m6 offset-m1">
            <div className="">
              <div className="skills-nav">
                <div>
                  <div class   = "btn-floating skills-nav-button waves-effect"
                       onClick = {this.handleShiftRight}
                       style   = {{ backgroundColor : theme.skills.backgroundColor }}>
                    <i class = "material-icons skills-nav-button-icon"
                       style = {{ cursor : cursorRight,
                                  color  : theme.skills.accentColor }}>
                      chevron_left
                    </i>
                  </div>    
                </div>
                <div>
                  <div class   = "btn-floating skills-nav-button waves-effect"
                       onClick = {this.handleShiftLeft}
                       style   = {{ backgroundColor : theme.skills.backgroundColor }}>
                    <i class = "material-icons skills-nav-button-icon"
                       style = {{ cursor : cursorLeft,
                                  color  : theme.skills.accentColor }} >
                      chevron_right
                    </i>
                  </div>
                </div>
              </div>
              {
                this.createTab(skills)
              }
              <div className="skills-nav">
                <div class   = "btn waves-effect skill-type-btn"
                     onClick = {this.handleLanguageSkillChange}
                     style   = {{ backgroundColor : theme.skills.backgroundColor,
                                  color           : theme.skills.accentColor    ,
                                  borderBottom    : langHighlight               ,
                                  transition      : 'border-bottom 0.3s linear' }}>
                  Languages
                </div>    
                <div class   = "btn waves-effect skill-type-btn"
                     onClick = {this.handleToolSkillChange}
                     style   = {{ backgroundColor : theme.skills.backgroundColor,
                                  color           : theme.skills.accentColor    ,
                                  borderBottom    : toolHighlight               ,
                                  transition      : 'border-bottom 0.3s linear' }}>
                  Tools
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Skills.contextTypes = {
  muiTheme: PropTypes.object
};

function mapStateToProps(state) {
  return {
    jsonData: state.jsonInfo
  };
}

export default connect(mapStateToProps, { fetchJsonInfo })(Skills);