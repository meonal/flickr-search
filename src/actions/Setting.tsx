import actionCreatorFactory from 'typescript-fsa';
import { State, SettingState, ColorTheme } from '../types';
import FavActions from './Fav';
import * as db from '../firebase/db/setting';
import firebase from '../firebase';

const actionCreator = actionCreatorFactory();
// 全設定をsync
export const syncSettig = actionCreator<SettingState>('SYNC_SETTING');
// テーマをセット
export const setTheme = actionCreator<ColorTheme>('SET_THEME');

export default class SettingActions {
  private static instance: SettingActions;
  private dispatch: any;
  private getState: () => State;

  private constructor(dispatch: any, getState: any) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.fav = FavActions.getInstance(dispatch);
  }
  static getInstance(dispatch?: any, getState?: any) {
    if (!this.instance) {
      this.instance = new SettingActions(dispatch, getState);
    }
    return this.instance;
  }
  fav: FavActions;

  // Actions

  setTheme = (theme: ColorTheme) => {
    this.dispatch(setTheme(theme));
    this.writeSetting();
  }

  subscribeSettingChanged = async () => {
    const userid = firebase.auth().currentUser!.uid;
    return db.subscribeSettingChanged(userid, setting => this.dispatch(syncSettig(setting)));
  }

  // 内部実装

  private writeSetting() {
    const userid = firebase.auth().currentUser!.uid;
    const setting = this.getState().setting;
    db.writeSetting(userid, setting);
  }
}
