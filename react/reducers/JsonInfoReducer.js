import { resolve }         from 'redux-simple-promise'
import { FETCH_JSON_INFO } from '../actions/index'

const initialState = { data: {} };

const JsonInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case resolve(FETCH_JSON_INFO): {
      console.log(action.payload.data);
      return { ...state, data: action.payload.data };
    }
    default:
      return state;
  }
}

export default JsonInfoReducer;