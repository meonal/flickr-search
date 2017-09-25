import * as React from 'react';
import './PhotoList.css';
import PhotoItem from './PhotoItem';
import { PhotoViewItem } from '../types';
import SearchActions from '../actions/Search';
const Lightbox = require('react-image-lightbox');

interface Props {
  items: PhotoViewItem[];
  actions: SearchActions;
  isLoading?: boolean;
}

class PhotoList extends React.Component<Props, object> {
  // LightboxのstateはStoreで管理する必要がないためコンポーネント内で管理
  constructor(props: any) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  openLightbox = (index: number) => this.setState({ isOpen: true, photoIndex: index });

  render() {
    const { photoIndex, isOpen } = this.state as any;
    const { items, actions, isLoading } = this.props;
    const style = 'photo-list' + (isLoading ? '-loading' : '');
    const photoItems = items.map((item, index) => {
      return <PhotoItem key={item.id} item={item} actions={actions}
        index={index} onPhotoClick={this.openLightbox} />;
    });

    // Lightbox用の画像url
    const images = items.map(item => item.url_o === undefined ? item.url_l : item.url_o);
    // 見た目のためpadding用のdummy
    //const dummyItems = Array(10).fill(0).map((_, i) => <li styleName="dummy"></li>);

    return (
      <div styleName={style}>
        {photoItems}

        {isOpen && // オーバーレイでLightboxを表示
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}

            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => this.setState({
              photoIndex: (photoIndex + images.length - 1) % images.length,
            })}
            onMoveNextRequest={() => this.setState({
              photoIndex: (photoIndex + 1) % images.length,
            })}
          />
        }
      </div>
    );
  }
}

export default PhotoList;