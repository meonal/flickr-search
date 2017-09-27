import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './search';
import fav from './fav';
import detail from './detail';
import setting from './setting';
import account from './account';

const rootReducer = combineReducers({
  router: routerReducer,
  search,
  fav,
  detail,
  setting,
  account,
});

export default rootReducer;
