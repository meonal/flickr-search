import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();
import { push } from 'react-router-redux';
import { DetailType } from '../types';

export const setDetail = actionCreator<{ id: string, type: DetailType }>('SET_DETAIL');

export default class RoutingActions {
  private static instance: RoutingActions;
  private dispatch: any;

  private constructor(dispatch: any) {
    this.dispatch = dispatch;
  }
  static getInstance(dispatch?: any) {
    if (!this.instance) {
      this.instance = new RoutingActions(dispatch);
    }
    return this.instance;
  }

  // 画面遷移
  // Presentation Componentの再利用性を考慮して外側から注入する
  gotoSearch = () => this.dispatch(push('/'));
  gotoFav = () => this.dispatch(push('/fav'));
  gotoDetail = (id: string, pathname: string) => {
    this.dispatch(setDetail({ id, type: DetailType.Parse(pathname) }));
    this.dispatch(push('/detail/' + id));
  }
}  
