import { Component } from 'react';
import PropTypes from 'prop-types';

import { GalleryItem } from './ImageGalleryItem.styled';
import { ImageModal } from 'components/ImageModal/ImageModal';

export class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toogleModal = () => {
    this.setState(prevState => ({ isShowModal: !prevState.isShowModal }));
  };

  handleClickImage = () => {
    this.setState({ isShowModal: true });
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.setState({ isShowModal: false });
    }
  };

  render() {
    const { isShowModal } = this.state;
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <GalleryItem onClick={this.toogleModal}>
          <img src={webformatURL} alt={tags} />
        </GalleryItem>
        {isShowModal && (
          <ImageModal
            tags={tags}
            largeImageURL={largeImageURL}
            handleBackdropClick={this.handleBackdropClick}
            onCloseModal={this.toogleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
