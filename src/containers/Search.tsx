import * as React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Pager from '../components/Pager';
import PhotoList from '../components/PhotoList';
import SearchActions from '../actions/Search';
import { connect } from 'react-redux';
import { State, PhotoViewItem, ViewType, SearchCondition } from '../types';
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
      <div>
        <Header />
        <div styleName="page-body">
          <SearchBar current={condition} actions={actions} />
          <PhotoList items={items} actions={actions} isLoading={isLoading} />
          {items.length > 0 ? <Pager current={condition} actions={actions} inverse={true} /> : ''}
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state: State): StateProps {
  const search = state.search;
  return {
    items: search.photos.map(x => new PhotoViewItem(x)),
    viewType: search.viewType,
    condition: search.condition,
    isLoading: search.isLoading,
  };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: SearchActions.getInstance(dispatch) };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Search);