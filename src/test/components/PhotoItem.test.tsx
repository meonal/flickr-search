import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import * as PhotoItem from '../../components/PhotoItem'
import { PhotoViewItem } from '../../types/index';
import SearchActions from '../../actions/Search';
import configureStore from '../../store/configureStore';
import { Location } from 'history';

export const store = configureStore();

const item: PhotoViewItem = {
  id: "1",
  title: "photo title",
  user_id: "2",
  ownername: "foo bar",
  datetaken: "2017/01/01 12:34:56",
  dateupload: "2017/02/01 12:34:56",
  lastupdate: "2017/03/01 12:34:56",
  views: 100,
  url_s: "http://example.com/s",
  url_l: "http://example.com/l",
  url_o: "http://example.com/9",
  pathalias: "hoge/fuga",
  isFav: true,
};

const actions = SearchActions.getInstance(store.dispatch);
const onPhotoClick = (index: number) => { };
const location: Location = {
  pathname: '/fav',
  search: '',
  state: '',
  hash: '',
  key: ''
}

describe('スナップショット', () => {
  it('スナップショット', () => {
    const snapshot = renderer.create(
      <PhotoItem.PhotoItem item={item} actions={actions} index={1}
        onPhotoClick={onPhotoClick} location={location} />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe('テキストレンダリング', () => {
  let photoItem: enzyme.ShallowWrapper<any, any>;
  beforeEach(() => {
    photoItem = enzyme.shallow(
      <PhotoItem.PhotoItem item={item} actions={actions} index={1}
        onPhotoClick={onPhotoClick} location={location} />);
  });

  it('title', () => {
    expect(photoItem.find('[styleName="title"]').text()).toEqual('photo title');
    expect(photoItem.find('[styleName="title"]').text()).not.toEqual('');
  });
  it('author', () => {
    expect(photoItem.find('[styleName="author"]').text()).toEqual('foo bar');
    expect(photoItem.find('[styleName="author"]').text()).not.toEqual('');
  });
  it('count', () => {
    expect(photoItem.find('[styleName="count"]').text()).toEqual('100 Views');
    expect(photoItem.find('[styleName="count"]').text()).not.toEqual('0 Views');
    expect(photoItem.find('[styleName="count"]').text()).not.toEqual('');
  });
});