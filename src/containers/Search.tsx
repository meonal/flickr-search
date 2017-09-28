import * as React from 'react';
import SearchBar from '../components/SearchBar';
import Pager from '../components/Pager';
import PhotoList from '../components/PhotoList';
import SearchActions from '../actions/Search';
import { connect } from 'react-redux';
import { State, PhotoViewItem, ViewType, SearchCondition } from '../types';
import Header from './Header';
import './Container.css';

interface StateProps {
  items: PhotoViewItem[];
  viewType: ViewType;
  condition: SearchCondition;
  isLoading: boolean;
}
interface DispatchProps {
  actions: SearchActions;
}
type SearchProps = StateProps & DispatchProps;

class Search extends React.Component<SearchProps, any> {
  render() {
    const { items, condition, actions, isLoading } = this.props;
    return (
      <div styleName="page-body">
        <Header />
        <SearchBar current={condition} actions={actions} />
        <PhotoList items={items} actions={actions} isLoading={isLoading} />
        {items.length > 0 ? <Pager current={condition} actions={actions} inverse={true} /> : ''}
      </div>
    );
  }
}

export function mapStateToProps(state: State): StateProps {
  const search = state.search;
  const fav = state.fav;
  // fav反映
  console.time('a');
  const items = search.photos.map(x => {
    let item = new PhotoViewItem(x);
    const idx = fav.photos.findIndex(p => p.id === x.id);
    if (idx !== -1) {
      item.isFav = true;
    }
    return item;
  });
  console.timeEnd('a');
  return {
    items,
    viewType: search.viewType,
    condition: search.condition,
    isLoading: search.isLoading,
  };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: SearchActions.getInstance() };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Search);