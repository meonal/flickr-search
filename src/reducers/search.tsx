import { SearchState, ViewType, SearchType, SearchCondition } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Search';

const initialState: SearchState = {
  viewType: ViewType.Normal,
  photos: [],
  condition: new SearchCondition(SearchType.Global),
};

const search = reducerWithInitialState(initialState)
  // fav  
  .case(actions.toggleFav, (state, obj) => {
    const { id } = obj;
    if (state.photos.length === 0) return state;

    let idx = state.photos.findIndex(x => x.id === id);
    if (idx === -1) return state;

    const newState = { ...state };
    newState.photos[idx].isFav = !newState.photos[idx].isFav;
    return newState;
  })
  .case(actions.clearFavs, (state) => {
    const photos = state.photos.map(x => {
      return { ...x, isFav: false };
    });
    return { ...state, photos };
  })

  // searchPhoto(async)
  .case(actions.searchPhoto.started, (state, payload) => {
    const condition = { ...state.condition, message: '' };
    return { ...state, condition };
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
    return { ...state, photos: items, condition };
  })
  .case(actions.searchPhoto.failed, (state, payload) => {
    const condition = { ...state.condition, message: payload.error.message };
    return { ...state, condition };
  })

  // fetchPhoto(async)
  .case(actions.fetchPhoto.started, (state, payload) => {
    const condition = { ...state.condition, message: '' };
    return { ...state, condition };
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
    return { ...state, photos: items, condition };
  })
  .case(actions.fetchPhoto.failed, (state, payload) => {
    const condition = { ...state.condition, message: payload.error.message };
    return { ...state, condition };
  })
  ;

export default search;