import { resolve }         from 'redux-simple-promise';
import { FETCH_SITE_INFO } from '../actions/index';

const initialState = { data: {} };

const SiteInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case resolve(FETCH_SITE_INFO):
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
}

export default SiteInfoReducer;