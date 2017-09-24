import actionCreatorFactory from 'typescript-fsa';
import { ColorTheme } from '../types';

const actionCreator = actionCreatorFactory();
// テーマをセット
export const setTheme = actionCreator<ColorTheme>('SET_THEME');

export default class SettingActions {
  private static instance: SettingActions;
  private dispatch: any;

  private constructor(dispatch: any) {
    this.dispatch = dispatch;
  }
  static getInstance(dispatch: any) {
    if (!this.instance) {
      this.instance = new SettingActions(dispatch);
    }
    return this.instance;
  }

  setTheme = (theme: ColorTheme) => this.dispatch(setTheme(theme));
}
