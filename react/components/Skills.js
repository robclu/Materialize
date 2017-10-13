import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { fetchJsonInfo, FETCH_SKILLS_INFO } from '../actions/index'
import PropTypes from 'prop-types'

class SingleSkill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var accentColor = this.props.theme.skills.accentColor;
    return (
      <div className="skills-item"
           style={{ width           : '120px' }}>
        <div className="skill">
          <div className="skill-bottom">
            <div className="skill-header z-depth-0"
                style={{ backgroundColor : accentColor }}>
              <div className="skill-visible">
                <span className="skill-name"
                      style={{ color : accentColor }}>
                    {this.props.skillName}
                </span>
                <div className="header-point z-depth-0"
                     style={{ backgroundColor : accentColor }}>
                  <div className="header-point-top z-depth-0"
                       style={{ backgroundColor : accentColor }}>
                  </div>
                </div>
              </div>
            </div>
            <div className="skill-filler">
              <ul>
              {
                //if (this.props.skillFiller.length === 0) {
                //  return;
               // }

                this.props.skillFiller.map(fillerName => {
                  //return (<li>{fillerName}</li>);
                })
              }
              </ul>
            </div>
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
      <div className="skills-outer">
        <div className="skills-wrapper">
          {
            languages.map((language) => {
              var filler = []
              if (language[2].hasOwnProperty("libraries")) { 
                filler = language[2].libraries;
              }

              return <SingleSkill skillName={language[1]} 
                                  skillFiller={filler} 
                                  theme={this.context.muiTheme}/>
            })
          }
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
          <div className="col s12 m8 offset-m2">
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