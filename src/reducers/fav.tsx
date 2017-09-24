import { FavState, ViewType } from '../types/';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/Search';

const initialState: FavState = {
  viewType: ViewType.Normal,
  photos: []
};

const fav = reducerWithInitialState(initialState)
  .case(actions.toggleFav, (state, obj) => {
    const { id, item } = obj;
    // Favリストに追加・削除
    const newState = { ...state };
    let index = newState.photos.findIndex(x => x.id === id)!;
    if (index === -1) {
      newState.photos.push({ ...item!, isFav: true });
    } else {
      newState.photos.splice(index, 1);
    }
    return newState;
  })
  .case(actions.clearFavs, (state) => {
    return { ...state, photos: [] };
  })
  ;

export default fav;