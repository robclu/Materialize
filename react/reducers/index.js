import { combineReducers } from 'redux';
import SiteInfoReducer from './site_info';

const rootReducer = combineReducers({
  siteInfo: SiteInfoReducer
});

export default rootReducer;