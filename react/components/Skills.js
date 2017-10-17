import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { fetchJsonInfo, FETCH_SKILLS_INFO } from '../actions/index'
import PropTypes from 'prop-types'

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
  }

  renderSkillInfo(accentColor, backgroundColor) {
    var shift = this.props.shift * (this.props.size * -1 - 40);
    var tform = 'scale(' + this.props.scale + ')';
    var opacity = this.props.scale < 0.9 ? 0 : 1;
    var style = Object.assign({ left      : shift   , 
                                transform : tform   ,
                                opacity   : opacity }, this.outerStyle);
    return (
      <div className = "card hover-pointer hover-up"
           onClick   = {this.handleClick}
           style     = {style}>
        <div className="helper-header"></div>
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

    var shift   = this.props.shift * (this.props.size * -1 - 40);
    var tform   = 'scale(' + this.props.scale + ')';
    var opacity = this.props.scale < 0.9 ? 0 : 1;
    var style = Object.assign({ left      : shift  ,
                                transform : tform  ,
                                opacity   : opacity}, this.outerStyle);
    return (
      <div className = {className}
           onClick   = {onClick}
           style     = {style}>
        <div className="helper">
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
    this.state = {
      skillsStartIndex : 0,
      tabIndex         : 0
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
      <div className = "skill-loaded"
           style     = {{ width : this.skillContainerWidth,
                          height : this.skillContainerHeight }}>
        <div className="skills-outer" style={{ width : this.skillContainerWidth }}>
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
    var languages = this.sortByLevel(this.props.jsonData.skills.languages);
    var tools     = this.sortByLevel(this.props.jsonData.skills.tools);
    
    var start = (this.state.skillsStartIndex + 3 > languages.length) 
              ? languages.length - 3 : this.state.skillsStartIndex;

    var cursorLeft  = this.state.skillsStartIndex > 0 ? 'pointer' : 'not-allowed';
    var cursorRight = this.state.skillsStartIndex + this.skillsInView === languages.length
                    ? 'not-allowed' : 'pointer';

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
            <div className="skills-tabs">
              <div> A </div>
              <div> B </div>
            </div>
            <div className="skills-carousel">
              <div className="skills-nav-left">
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
              <div className="skills-nav-right">
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
              {
                this.createTab(languages)
              }
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