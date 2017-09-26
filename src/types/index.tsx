import * as constants from '../constants';
import * as moment from 'moment';
import { RouterState } from 'react-router-redux';
import { UserInfo } from 'firebase';

// state

export interface State {
  search: SearchState;
  fav: FavState;
  detail: DetailState;
  setting: SettingState;
  router: RouterState;    // react-router-redux
}

export interface SearchState {
  viewType: ViewType;
  photos: PhotoItem[];
  condition: SearchCondition;
  isLoading: boolean;
}

export class SearchCondition {
  searchType: SearchType;
  text: string;
  user_id: string;
  ownername: string;
  sort: string;
  page: number;
  pages: number;
  perpage: number;
  total: string;
  message: string;

  constructor(type: SearchType) {
    this.searchType = type;
    this.text = '';
    this.user_id = '';
    this.ownername = '';
    this.sort = type === SearchType.User
      ? constants.sortPopular[0]
      : constants.sortSearch[0];
    this.page = 0;
    this.pages = 0;
    this.perpage = 25;
    this.total = '';
    this.message = '';
  }
}

export type PhotoItem = Photo & PhotoMyAppDefine;

export interface PhotoMyAppDefine {
  isFav: boolean;
}

export enum ViewType {
  Normal,
  Large,
}

export enum SearchType {
  Global,
  User,
}

export enum DetailType {
  Search = 'Search',
  Fav = 'Fav',
  None = 'None'
}
export namespace DetailType {
  export function Parse(input: string) {
    switch (input) {
      case '/':
        return DetailType.Search;
      case '/fav':
        return DetailType.Fav;
      default:
        return DetailType.None;
    }
  }
}

export interface FavState {
  viewType: ViewType;
  photos: PhotoItem[];
  // sort: string;
}

export interface DetailState {
  id: string;
  type: DetailType;
}

export enum ColorTheme {
  Light = 'light',
  Dark = 'dark',
}

export interface SettingState {
  theme: ColorTheme;
  user: UserInfo;
}

// props (View)

export class PhotoViewItem implements PhotoViewItem {
  id: string;
  title: string;
  user_id: string;
  ownername: string;
  datetaken: string;
  dateupload: string;
  lastupdate: string;
  views: number;
  url_s: string;
  url_l: string;
  url_o: string;
  pathalias: string;
  isFav: boolean;

  constructor(p: PhotoItem) {
    this.id = p.id;
    this.title = p.title;
    this.user_id = p.owner;
    this.ownername = p.ownername;
    this.datetaken = p.datetaken;
    this.dateupload = moment.unix(Number(p.dateupload)).format(constants.dateFormat);
    this.lastupdate = moment.unix(Number(p.lastupdate)).format(constants.dateFormat);
    this.views = Number(p.views);
    this.url_s = p.url_s;
    this.url_l = p.url_l;
    this.url_o = p.url_o;
    this.pathalias = p.pathalias;
    this.isFav = p.isFav;
  }
}

// Error

export class MyError extends Error {
  constructor(m: string) {
    super(m);
  }
  isRequiredRethrow: boolean;
}

// flickr api

export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  dateupload: string;
  lastupdate: string;
  datetaken: string;
  datetakengranularity: any;
  datetakenunknown: string;
  ownername: string;
  views: string;
  url_s: string;
  height_s: string;
  width_s: string;
  url_l: string;
  height_l: string;
  width_l: string;
  url_o: string;
  height_o: string;
  width_o: string;
  pathalias: string;
}

export interface Photos {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: Photo[];
}

export interface PhotoResult {
  photos: Photos;
  stat: string;
  code: number;     // stat === "fail"
  message: string;  // stat === "fail"
}