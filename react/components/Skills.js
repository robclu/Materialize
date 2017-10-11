import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { fetchJsonInfo, FETCH_SKILLS_INFO } from '../actions/index'
import PropTypes from 'prop-types'

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
    console.log(languages);
    return (
      <div>
        <ul>
        {
          languages.map((language) => {
            console.log(language[2].libraries);
            var libraries = []
            for (var lib in language[2].libraries) {
              libraries.push(lib);
            }
            //console.log(libraries);
            return (
              <li>
                <span>{language[1]}</span>
                <ul>
                {
                  libraries.map((library) => {
                    //console.log(library);
                    return (<li>{library}</li>);
                  })
                }
                </ul>
              </li>
            )
          })
        }
        </ul>
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