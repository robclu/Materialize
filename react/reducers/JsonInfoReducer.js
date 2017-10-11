import { resolve }           from 'redux-simple-promise'
import { FETCH_ABOUT_INFO,
         FETCH_SKILLS_INFO } from '../actions/index'

const initialState = { about: {}, skills: {} };

const JsonInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case resolve(FETCH_ABOUT_INFO): {
      return { ...state, about: action.payload.data };
    }
    case resolve(FETCH_SKILLS_INFO): {
      return { ...state, skills: action.payload.data };
    }
    default:
      return state;
  }
}

export default JsonInfoReducer;