import actionCreatorFactory from 'typescript-fsa';
import { State, PhotoItem, PhotoViewItem } from '../types';
import * as db from '../firebase/db/fav';
import firebase from '../firebase';

// Action Creator
// reducerからはこちらを参照する

const actionCreator = actionCreatorFactory();

export const addFav = actionCreator<PhotoItem>('ADD_FAV');
export const removeFav = actionCreator<string>('REMOVE_FAV');
export const syncFav = actionCreator<PhotoItem[]>('SYNC_FAVS');
export const clearFavs = actionCreator('CLEAR_FAVS');

// Action Dispatcher

export default class FavActions {
  private static instance: FavActions;
  private dispatch: any;
  private getState: () => State;

  private constructor(dispatch: any, getState: any) {
    this.dispatch = dispatch;
    this.getState = getState;
  }
  static getInstance(dispatch?: any, getState?: any) {
    if (!this.instance) {
      this.instance = new FavActions(dispatch, getState);
    }
    return this.instance;
  }

  // Action
  toggleFav = (viewItem: PhotoViewItem) => this.dispatch(this.toggleFavWorker(viewItem));
  clearFav = () => this.dispatch(clearFavs());

  syncFav = async () => {
    const userid = firebase.auth().currentUser!.uid;
    const items = await db.readFav(userid);
    this.dispatch(syncFav(items));
  }

  subscribeFavAdded = () => {
    const userid = firebase.auth().currentUser!.uid;
    return db.subscribeFavAdded(userid, item => this.dispatch(addFav(item)));
  }

  subscribeFavRemoved = () => {
    const userid = firebase.auth().currentUser!.uid;
    return db.subscribeFavRemoved(userid, id => this.dispatch(removeFav(id)));
  }

  // 内部実装

  // 写真のFavのON/OFF
  private toggleFavWorker = (viewItem: PhotoViewItem) =>
    (dispatch: any, getState: () => State) => {
      const id = viewItem.id;
      const user = firebase.auth().currentUser;
      if (viewItem.isFav) {
        dispatch(removeFav(id));
        if (user) {
          db.removeFav(user.uid, id);
        }
      } else {
        const { search } = getState();
        const item = search.photos.find(x => x.id === id)!;
        const newItem = { ...item, isFav: true };
        dispatch(addFav(newItem));
        if (user) {
          db.addFav(user.uid, newItem);
        }
      }
    }

}
