import * as React from 'react';
import Header from '../components/Header';
// import SearchBar from '../components/SearchBar'
import PhotoDetail from '../components/PhotoDetail';
import SearchActions from '../actions/Search';
import { connect } from 'react-redux';
import { State, PhotoViewItem, PhotoItem, DetailType } from '../types';
import './Container.css';

interface StateProps {
  item: PhotoViewItem;
  neighbors: PhotoViewItem[];
}
interface DispatchProps {
  actions: SearchActions;
}

type SearchProps = StateProps & DispatchProps;

class Detail extends React.Component<SearchProps, any> {
  render() {
    const { item, neighbors, actions } = this.props;
    return (
      <div>
        <Header />
        <div styleName="page-body">
          <PhotoDetail item={item} neighbors={neighbors} actions={actions} />
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
  const photos = state.detail.type === DetailType.Fav
    ? state.fav.photos
    : state.search.photos;
  const match = state.location.currentPath.match(/[0-9]+/);
  if (match === null) {
    throw new Error("ブラウザの戻るでここに来ること自体おかしいけどなぜか来る:"
      + state.location.currentPath);
  }
  const id = match![0];
  const idx = photos.findIndex(photo => photo.id === id)!;
  const neighbors = findNeighbor<PhotoItem>(photos, idx, 2).map(x => new PhotoViewItem(x));
  const item = neighbors.find(x => x.id === id)!;
  return { item, neighbors };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: SearchActions.getInstance(dispatch) };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Detail);