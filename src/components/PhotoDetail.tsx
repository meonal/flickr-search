import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import SearchActions from '../actions/Search';
import { PhotoViewItem, SearchCondition, SearchType } from '../types';
import { userUrl } from '../constants';
import { withRouter } from 'react-router-dom';
import './PhotoDetail.css';

interface Props {
  item: PhotoViewItem;
  neighbors: PhotoViewItem[];
  actions: SearchActions;
}

class PhotoDetail extends React.Component<Props, object> {
  condition = new SearchCondition(SearchType.User);

  render() {
    const { item, neighbors, actions } = this.props;
    if (item === undefined) return null;

    const id = item.id;
    const pathname = (this.props as any).location.pathname;

    const thumbnails = neighbors.map(x => {
      const style = 'thumbnail' + (x.id === id ? '-gray' : '');
      const onclick = x.id === id ? undefined : () => actions.gotoDetail(x.id, pathname);
      return <img key={x.id} styleName={style} src={x.url_s} alt={x.title} onClick={onclick} />;
    });

    const bsStyle = item.isFav ? 'success' : 'primary';
    const star = 'star' + (item.isFav ? '' : '-empty');
    const largeUrl = item.url_o === undefined ? item.url_l : item.url_o;
    const flickrUrl = userUrl + item.pathalias + '/' + item.id;

    return (
      <div styleName="photo-detail">
        <div styleName="thumbnail-list">
          {thumbnails}
        </div>
        <div styleName="description">
          <div styleName="title">{item.title}</div>
          <div styleName="author">
            <a href="#" onClick={() => actions.fetchPhotoTransition(
              { ...this.condition, user_id: item.user_id, ownername: item.ownername }, pathname)}>
              {item.ownername}</a>
          </div>
          <div styleName="info">
            <div>
              <div styleName="count">{item.views} Views</div>
              <Button styleName="space" onClick={() => window.open().location.href = flickrUrl} >
                <span styleName="bold">Open Flickr</span>
              </Button>
              <Button bsStyle={bsStyle} onClick={() => actions.toggleFav(item.id)} >
                <Glyphicon glyph={star} />
              </Button>
            </div>
            <div>
              taken:<span styleName="bold space">{item.datetaken} </span>
              upload:<span styleName="bold space">{item.dateupload}</span>
            </div>
          </div>
        </div>
        <div styleName="photo-area">
          <a href={largeUrl} target="_blank">
            <img styleName="photo" src={item.url_l} alt={item.title} />
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(PhotoDetail);