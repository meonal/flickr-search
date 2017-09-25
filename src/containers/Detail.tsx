import * as React from 'react';
import Header from '../components/Header';
import PhotoDetail from '../components/PhotoDetail';
import SearchActions from '../actions/Search';
import { connect } from 'react-redux';
import { State, PhotoViewItem, PhotoItem, DetailType } from '../types';
import './Container.css';

interface StateProps {
  state: State;
}
interface DispatchProps {
  actions: SearchActions;
}

type SearchProps = StateProps & DispatchProps;

class Detail extends React.Component<SearchProps, any> {
  render() {
    const { state, actions } = this.props;
    const pathname = (this.props as any).match.url;
    const id = (this.props as any).match.params.id;
    console.log('pathname render: ' + pathname);

    const photos = state.detail.type === DetailType.Fav
      ? state.fav.photos
      : state.search.photos;
    const idx = photos.findIndex(photo => photo.id === id)!;
    const thumbnails = findNeighbor<PhotoItem>(photos, idx, 2).map(x => new PhotoViewItem(x));
    const item = thumbnails.find(x => x.id === id)!;

    return (
      <div>
        <Header />
        <div styleName="page-body">
          <PhotoDetail item={item} thumbnails={thumbnails} actions={actions} />
        </div>
      </div>
    );
  }
}

function findNeighbor<T>(items: T[], ownIdx: number, radius: number): T[] {
  const tmplen = radius * 2 + 1;
  const len = items.length > tmplen ? tmplen : items.length;
  let start = ownIdx > radius ? ownIdx - radius : 0;
  if (start + len > items.length)
    start = items.length - len;
  let result = Array<T>();
  for (let i = start; i < len + start; i++) {
    result.push(items[i]);
  }
  return result;
}

export function mapStateToProps(state: State): StateProps {
  console.log('pathname map:    ' + state.router.location!.pathname);
  // ブラウザの「戻る」の場合、pathnameが遷移先になりIDが取れないためrenderで絞込する
  // ('/detail/123456'から'/'に戻る場合、ここで取れるpathnameは'/'になる)
  return { state };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: SearchActions.getInstance(dispatch) };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Detail);