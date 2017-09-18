import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { PhotoViewItem, SearchCondition, SearchType } from '../types';
import SearchActions from '../actions/Search';
import { withRouter } from 'react-router-dom';
import './PhotoItem.css';

interface Props {
  item: PhotoViewItem;
  actions: SearchActions;
  index: number;
  onPhotoClick: (index: number) => void;
}

class PhotoItem extends React.Component<Props, object> {
  condition = new SearchCondition(SearchType.User);

  render() {
    const { item, actions, index, onPhotoClick } = this.props;
    const pathname = (this.props as any).location.pathname;

    const bsStyle = item.isFav ? 'success' : 'primary';
    const star = 'star' + (item.isFav ? '' : '-empty');

    return (
      <div styleName="photo-item">
        <div styleName="photo-area">
          <a href="#" onClick={(e: any) => { onPhotoClick(index); e.preventDefault(); }}>
            <img styleName="photo" src={item.url_s} alt={item.title} />
          </a>
        </div>
        <div styleName="title">{item.title}</div>
        <div styleName="author">
          <a href="#" onClick={() => actions.fetchPhotoTransition(
            { ...this.condition, user_id: item.user_id, ownername: item.ownername }, pathname)}>
            {item.ownername}</a>
        </div>
        <div styleName="count">{item.views} Views</div>
        <Button styleName="space" bsSize="small" onClick={() => actions.gotoDetail(item.id, pathname)} >
          <Glyphicon glyph="info-sign" />
        </Button>
        <Button bsStyle={bsStyle} bsSize="small" onClick={() => actions.toggleFav(item.id)} >
          <Glyphicon glyph={star} />
        </Button>
      </div>
    );
  }
}

export default withRouter(PhotoItem);