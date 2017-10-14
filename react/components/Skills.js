import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { fetchJsonInfo, FETCH_SKILLS_INFO } from '../actions/index'
import PropTypes from 'prop-types'

class SingleSkill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var accentColor     = this.props.theme.skills.accentColor;
    var backgroundColor = this.props.theme.skills.backgroundColor;
    return (
      <div className = "card"
           style     = {{ margin : '20',
                          width  : '250px',
                          height : '250px',
                          borderRadius : '10px' }}>
        <div className="helper">
        </div>
        <div className="skill-title" style={{ color : backgroundColor }}>
          {this.props.skillName}
        </div>
        <div className="card-action" style={{ padding : 'unset' }}
            style={{  padding       : 'unset'        ,
                      paddingTop    : '10px'         ,
                      width         : '100%'         ,
                      textAlign     : 'center'       ,
                      color         : backgroundColor, 
                      textTransform : 'uppercase'    ,
                      fontWeight    : '600'          ,
                      fontSize      : '20px'         }}>
          <span>
            {this.props.skillLevel}
          </span>
        </div>
        <div className="card-reveal">
          <span className="card-title"> This is a test </span>
          <div>
            <ul>
            {
              //if (this.props.skillFiller.length === 0) {
              //  return;
             // }

              this.props.skillFiller.map(fillerName => {
                return (<li>{fillerName}</li>);
              })
            }
            </ul>          
          </div>
        </div>
      </div>
    )
  }
}

class Skills extends Component {
  constructor(props) {
    super(props);
    this.props.fetchJsonInfo(FETCH_SKILLS_INFO, 'skills');
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

  createLanguageTab(languages) {
    return (
      <div className="skill-loaded">
        <div className="skills-outer">
          <div className="skills-wrapper">
            {
              languages.map((language) => {
                var filler = []
                if (language[2].hasOwnProperty("libraries")) { 
                  filler = language[2].libraries;
                }
                var level = 'Proficient'
                if (language[2].level <= 5) {
                  level = 'Capable';
                } else if (language[2].level <= 7) {
                  level = 'Good';
                }

                return <SingleSkill skillName={language[1]} 
                                    skillFiller={filler}
                                    skillLevel={level}
                                    theme={this.context.muiTheme}/>
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

    var theme = this.context.muiTheme;
    var languages = this.sortByLevel(this.props.jsonData.skills.languages);
    var tools     = this.sortByLevel(this.props.jsonData.skills.tools);
    return (
      <div className="container"
           id="skills"
           style={{ backgroundColor : theme.skills.backgroundColor }}>
        <div className="row">
          <div className="col s10 m4 offset-s1 offset-m1">
            <div className="section-heading">
              <h2 style={{ color : theme.skills.titleColor }} >
                Skills
              </h2>
              <p style={{ color: theme.skills.titleColor }}>
                {this.props.jsonData.skills.description}
              </p>
            </div>
          </div>
          <div className="col s12 m6">
            {
              this.createLanguageTab(languages)
            }
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