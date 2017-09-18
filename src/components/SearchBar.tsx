import * as React from 'react';
import './SearchBar.css';
import SearchForm from './SearchForm';
import Pager from './Pager';
import { SearchCondition, SearchType } from '../types';
import SearchActions from '../actions/Search';

interface Props {
  current: SearchCondition;
  actions: SearchActions;
}

class SearchBar extends React.Component<Props, object> {
  render() {
    const { current, actions } = this.props;
    const target = current.searchType === SearchType.User
      ? current.ownername
      : current.text;

    return (
      <div styleName="search-bar">
        <SearchForm current={current} actions={actions} />
        <div styleName="margin">
          search: <span styleName="bold-large">{target}</span>
        </div>
        <Pager current={current} actions={actions} />
        <span styleName="red">{current.message}</span>
      </div>
    );
  }
}

export default SearchBar;