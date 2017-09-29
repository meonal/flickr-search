import firebase from '../';
import { PhotoItem } from '../../types';

export const db = firebase.database();

export async function addFav(userId: string, item: PhotoItem) {
  const fav = db.ref(`users/${userId}/fav/${item.id}`);
  return await fav.set(item);
}

export async function removeFav(userId: string, id: string) {
  const fav = db.ref(`users/${userId}/fav/${id}`);
  return await fav.remove();
}

export async function readFav(userId: string) {
  const favs = db.ref(`users/${userId}/fav`);
  const obj = (await favs.once('value')).val();
  return Object.keys(obj).map(key => obj[key]);
}

export function subscribeFavAdded(userId: string, action: (item: PhotoItem) => void) {
  const fav = db.ref('users/' + userId + '/fav');
  return fav.limitToLast(1).on('child_added', (snapshot) => {
    if (snapshot !== null) {
      action(snapshot.val());
    }
  });
}

export function subscribeFavRemoved(userId: string, action: (id: string) => void) {
  const fav = db.ref('users/' + userId + '/fav');
  return fav.on('child_removed', (snapshot) => {
    if (snapshot !== null) {
      action(snapshot.key!);
    }
  });
}
