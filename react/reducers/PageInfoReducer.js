import { resolve }    from 'redux-simple-promise'
import { FETCH_PAGE } from '../actions/index'

const initialState = { data: {} };

const PageInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case resolve(FETCH_PAGE): {
      const data = action.payload.data;
      return { ...state, data: data };
    }
    default:
      return state;
  }
}

export default PageInfoReducer;