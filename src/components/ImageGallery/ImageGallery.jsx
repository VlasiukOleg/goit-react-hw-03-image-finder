import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getSearchImage } from 'services/pixabayApi';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';

let page = 1;

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    isError: false,
  };

  handleLoadMoreButton = async () => {
    page += 1;

    try {
      const data = await getSearchImage(this.props.query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ isError: true });
    }
  };

  async componentDidUpdate(prevProps, _) {
    try {
      if (prevProps.query !== this.props.query) {
        this.setState({ isLoading: true, images: [] });
        const data = await getSearchImage(this.props.query, page);

        if (data.hits.length === 0) {
          Notify.warning(
            'Sorry, there are no images matching your serach query, please try again'
          );
          this.setState({ isLoading: false });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        }));
      }
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const { images, isLoading, isError } = this.state;

    return (
      <>
        {isError && <h1>OOPS. something went wrong try reloading the page</h1>}
        {isLoading && <LoadingSpinner />}
        <GalleryList id="gallery">
          {images.map((image, index) => (
            <ImageGalleryItem
              key={index}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
            />
          ))}
        </GalleryList>
        {images.length > 0 && (
          <LoadMoreButton handleLoadMoreButton={this.handleLoadMoreButton} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};
