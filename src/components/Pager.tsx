import * as React from 'react';
import './Pager.css';
import { SearchCondition, SearchType } from '../types';
import SearchActions from '../actions/Search';
import * as constants from '../constants';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

interface Props {
  current: SearchCondition;
  actions: SearchActions;
  inverse?: boolean;
}

class Pager extends React.Component<Props, object> {
  render() {
    const { current, actions, inverse = false } = this.props;
    const prev = current.page < 2;

    let next;
    let menuitems;
    let dropdown;
    let pages;
    let total;
    if (current.searchType === SearchType.User) {
      next = false;
      dropdown = false;
      pages = total = '(unknown)';
      menuitems = constants.sortPopular.map(x => {
        return <MenuItem key={x} eventKey={x}>{x}</MenuItem>;
      });
    } else {
      next = current.page === current.pages;
      dropdown = current.text === '';
      pages = current.pages.toString();
      total = current.total;
      menuitems = constants.sortSearch.map(x => {
        return <MenuItem key={x} eventKey={x}>{x}</MenuItem>;
      });
    }

    const pager = (
      <div>
        <ButtonGroup>
          <Button disabled={prev} onClick={() => actions.searchPrev(current)} >Prev</Button>
          <Button disabled={next} onClick={() => actions.searchNext(current)} >Next</Button>
        </ButtonGroup>
        <DropdownButton bsStyle="info" id="sort" title="sort" styleName="margin"
          disabled={dropdown} onSelect={(key: any) => actions.sortPhoto(current, key)}>
          {menuitems}
        </DropdownButton>
        <span>{current.sort}</span>
      </div>
    );
    const pageCount = (
      <div styleName="page-count">
        page: <span styleName="bold">{current.page}</span>
        / <span styleName="bold r">{pages}</span>
        per_page: <span styleName="bold r">{current.perpage}</span>
        total: <span styleName="bold r">{total}</span>
      </div>
    );
    return (
      <div styleName="pager">
        {inverse ? <div>{pageCount}{pager}</div> : <div>{pager}{pageCount}</div>}
      </div>
    );
  }
}

export default Pager;