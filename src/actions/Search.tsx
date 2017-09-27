import actionCreatorFactory from 'typescript-fsa';
import bindThunkAction from './bindThunkAction';
import RoutingActions from './Routing';
import FavActions from './Fav';
import * as constants from '../constants/';
import axios from 'axios';
import {
  SearchCondition, State, PhotoItem, SearchType,
  PhotoResult, MyError, Photos
} from '../types';

// Action Creator
// reducerからはこちらを参照する

const actionCreator = actionCreatorFactory();

export const searchPhoto = actionCreator.async<
  State,
  SearchCondition,
  { items: PhotoItem[], photos: Photos },
  MyError>('SEARCH_PHOTO');
export const fetchPhoto = actionCreator.async<
  State,
  SearchCondition,
  { items: PhotoItem[], photos: Photos },
  MyError>('FETCH_PHOTO');

// Action Dispatcher
// http://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696 を参考に実装
// presentation / container からはこちらを参照

export default class SearchActions {
  private static instance: SearchActions;
  private dispatch: any;

  private constructor(dispatch: any) {
    this.dispatch = dispatch;
    this.routing = RoutingActions.getInstance(dispatch);
    this.fav = FavActions.getInstance(dispatch);
  }
  static getInstance(dispatch?: any) {
    if (!this.instance) {
      this.instance = new SearchActions(dispatch);
    }
    return this.instance;
  }
  // other Actions
  routing: RoutingActions;
  fav: FavActions;

  // Action
  searchPhoto = async (condition: SearchCondition) => await this.dispatch(this.searchPhotoWorker(condition));
  fetchPhoto = async (condition: SearchCondition) => await this.dispatch(this.fetchPhotoWorker(condition));

  fetchPhotoTransition = async (condition: SearchCondition, path: string) => {
    if (path !== '/') {
      this.routing.gotoSearch();
    }
    await this.fetchPhoto(condition);
  }

  sortPhoto = (condition: SearchCondition, key: string) => {
    const next = { ...condition, sort: key, page: 1 };
    (this.getSearchMethod(condition.searchType))(next);
  }

  searchPrev = (condition: SearchCondition) => this.searchPrevNext(condition, -1);
  searchNext = (condition: SearchCondition) => this.searchPrevNext(condition, 1);

  private searchPrevNext = (condition: SearchCondition, diff: number) => {
    document.body.scrollTop = 0;
    const next = { ...condition, page: condition.page + diff };
    (this.getSearchMethod(condition.searchType))(next);
  }

  private getSearchMethod = (type: SearchType) =>
    type === SearchType.User ? this.fetchPhoto : this.searchPhoto

  // 内部実装

  // 写真の検索
  private searchPhotoWorker = bindThunkAction(
    searchPhoto, async (payload, _, getState) => {
      const params = {
        ...constants.searchParams,
        text: payload.text,
        sort: payload.sort,
        page: payload.page,
      };
      return await this.fetchWorker(getState, params);
    });

  // 指定ユーザの写真を取得
  private fetchPhotoWorker = bindThunkAction(
    fetchPhoto, async (payload, _, getState) => {
      const params = {
        ...constants.popularParams,
        user_id: payload.user_id,
        sort: payload.sort,
        page: payload.page,
      };
      return await this.fetchWorker(getState, params);
    });

  private async fetchWorker(getState: () => State, params: any) {
    const res = await axios.get(constants.apiEndpoint, { params });
    if (res.status >= 300 && res.status < 200) {
      throw new MyError(`[server error] ${res.status} ${res.statusText}`);
    }
    const fav = getState().fav;
    const data = res.data as PhotoResult;
    if (data.stat === 'fail') {
      throw new MyError(`[Flickr Error] code:${data.code} ${data.message}`);
    }
    // fav list との join
    const items = data.photos.photo.map((x): PhotoItem => {
      const exist = fav.photos.find(item => item.id === x.id);
      return { ...x, isFav: exist !== undefined };
    });
    return { items, photos: data.photos };
  }
}
