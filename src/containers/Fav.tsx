import * as React from 'react';
import PhotoList from '../components/PhotoList';
import SearchActions from '../actions/Search';
import { connect } from 'react-redux';
import { State, PhotoViewItem, ViewType } from '../types';
import { PageHeader } from 'react-bootstrap';
import Header from './Header';
import './Container.css';

interface StateProps {
  items: PhotoViewItem[];
  viewType: ViewType;
}
interface DispatchProps {
  actions: SearchActions;
}

type SearchProps = StateProps & DispatchProps;

class Fav extends React.Component<SearchProps, any> {
  render() {
    const { items, actions } = this.props;
    return (
      <div styleName="page-body">
        <Header />
        <PageHeader>Fav</PageHeader>
        <h4>{items.length === 0 ? "Let's Fav!!" : ''}</h4>
        <PhotoList items={items} actions={actions} />
      </div>
    );
  }
}

export function mapStateToProps(state: State): StateProps {
  const fav = state.fav;
  return {
    items: fav.photos.map(x => new PhotoViewItem(x)),
    viewType: fav.viewType,
  };
}

export function mapDispatchToProps(dispatch: any): DispatchProps {
  return { actions: SearchActions.getInstance(dispatch) };
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(Fav);