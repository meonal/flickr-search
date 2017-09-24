import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './search';
import fav from './fav';
import detail from './detail';
import location from './location';
import setting from './setting';

const rootReducer = combineReducers({
  router: routerReducer,
  search,
  fav,
  detail,
  location,
  setting,
});

export default rootReducer;
