import { FavState, ViewType } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Fav';

const initialState: FavState = {
  viewType: ViewType.Normal,
  photos: []
};

const fav = reducerWithInitialState(initialState)
  .case(actions.clearFavs, (state) => {
    return { ...state, photos: [] };
  })
  .case(actions.addFav, (state, item) => {
    let newState = { ...state };
    newState.photos.push(item);
    return newState;
  })
  .case(actions.removeFav, (state, id) => {
    let newState = { ...state };
    const idx = newState.photos.findIndex(x => x.id === id);
    if (idx > -1) {
      newState.photos.splice(idx, 1);
    }
    return newState;
  })
  .case(actions.syncFav, (state, items) => {
    return items ? { ...state, photos: items } : state;
  })
  ;

export default fav;