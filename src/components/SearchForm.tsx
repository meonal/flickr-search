import * as React from 'react';
import { Button } from 'react-bootstrap';
import { SearchCondition, SearchType } from '../types';
import { sortSearch } from '../constants';
import SearchActions from '../actions/Search';
import './SearchForm.css';

interface Props {
  current: SearchCondition;
  actions: SearchActions;
}

class SearchForm extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    const { current, actions } = this.props;
    const sort = sortSearch.find(x => current.sort === x) !== undefined
      ? current.sort
      : sortSearch[0];
    actions.searchPhoto({
      ...current,
      searchType: SearchType.Global,
      text: this.state.value,
      page: 1,
      sort,
    });
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="form-control" styleName="form-style" name="text" type="text"
          onInput={(e: any) => this.setState({ value: e.target.value })}
          value={this.state.value} />
        <Button bsStyle="primary" type="submit">Search</Button>
      </form>
    );
  }
}

export default SearchForm;