import { SearchState, ViewType, SearchType, SearchCondition } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Search';

const initialState: SearchState = {
  viewType: ViewType.Normal,
  photos: [],
  condition: new SearchCondition(SearchType.Global),
  isLoading: false,
};

const search = reducerWithInitialState(initialState)
  // searchPhoto(async)
  .case(actions.searchPhoto.started, (state, payload) => {
    const condition = { ...state.condition, message: '' };
    return { ...state, condition, isLoading: true };
  })
  .case(actions.searchPhoto.done, (state, payload) => {
    const { items, photos } = payload.result;
    const condition = {
      ...payload.params,
      message: '',
      page: photos.page,
      pages: photos.pages,
      perpage: photos.perpage,
      total: photos.total,
    };
    return { ...state, photos: items, condition, isLoading: false };
  })
  .case(actions.searchPhoto.failed, (state, payload) => {
    const condition = { ...state.condition, message: payload.error.message };
    return { ...state, condition, isLoading: false };
  })

  // fetchPhoto(async)
  .case(actions.fetchPhoto.started, (state, payload) => {
    const condition = { ...state.condition, message: '' };
    return { ...state, condition, isLoading: true };
  })
  .case(actions.fetchPhoto.done, (state, payload) => {
    const { items, photos } = payload.result;
    const condition = {
      ...payload.params,
      message: '',
      page: photos.page,
      pages: photos.pages,
      perpage: photos.perpage,
      total: photos.total,
    };
    return { ...state, photos: items, condition, isLoading: false };
  })
  .case(actions.fetchPhoto.failed, (state, payload) => {
    const condition = { ...state.condition, message: payload.error.message };
    return { ...state, condition, isLoading: false };
  })
  ;

export default search;