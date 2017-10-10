import { combineReducers } from 'redux'
import SiteInfoReducer from './SiteInfoReducer'
import PageInfoReducer from './PageInfoReducer'
import JsonInfoReducer from './JsonInfoReducer'

const rootReducer = combineReducers({
  siteInfo: SiteInfoReducer,
  pageInfo: PageInfoReducer,
  jsonInfo: JsonInfoReducer
});

export default rootReducer;