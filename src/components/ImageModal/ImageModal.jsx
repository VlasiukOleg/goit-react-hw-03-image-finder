import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalBackdrop, Modal } from './ImageModal.styled';

export class ImageModal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { handleBackdropClick, largeImageURL, tags } = this.props;
    return (
      <ModalBackdrop onClick={handleBackdropClick}>
        <Modal>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </ModalBackdrop>
    );
  }
}

ImageModal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleBackdropClick: PropTypes.func.isRequired,
};
