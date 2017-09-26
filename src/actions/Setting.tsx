import actionCreatorFactory from 'typescript-fsa';
import { ColorTheme } from '../types';
import firebase from '../firebase';
import { User, FirebaseError } from 'firebase';
import RoutingActions from './Routing';

const actionCreator = actionCreatorFactory();
// テーマをセット
export const setTheme = actionCreator<ColorTheme>('SET_THEME');
// 認証状態が変更
export const authStateChanged = actionCreator<User | undefined>("AUTH_STATE_CHANGED");

export default class SettingActions {
  private static instance: SettingActions;
  private dispatch: any;

  private constructor(dispatch: any) {
    this.dispatch = dispatch;
    this.routing = RoutingActions.getInstance(dispatch);
    this.registerOnAuthStateChanged();
  }
  static getInstance(dispatch: any) {
    if (!this.instance) {
      this.instance = new SettingActions(dispatch);
    }
    return this.instance;
  }
  // other Actions
  routing: RoutingActions;

  // Actions
  setTheme = (theme: ColorTheme) => this.dispatch(setTheme(theme));

  logout = () => {
    firebase.auth().signOut().then(() => {
      alert('ログアウトしました。');
      this.routing.gotoSearch();
    }).catch((error) => {
      console.log(error.message);
    });
  }

  deleteUser = async (): Promise<string> => {
    try {
      await firebase.auth().currentUser!.delete();
      return 'アカウントを削除しました。';
    } catch (ex) {
      const error: FirebaseError = ex;
      if (error.code === 'auth/requires-recent-login') {
        // The user's credential is too old. She needs to sign in again.
        await firebase.auth().signOut();
        // The timeout allows the message to be displayed after the UI has
        // changed to the signed out state.
        return '削除できませんでした。もう一度ログインしてから削除してください。';
      } else {
        return error.message;
      }
    }
  }

  // アカウント認証状態の監視
  private registerOnAuthStateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      this.dispatch(authStateChanged(user ? user : undefined));
    }, (error) => {
      console.log(error.message);
    });
  }

}
