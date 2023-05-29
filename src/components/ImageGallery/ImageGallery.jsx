import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getSearchImage } from 'services/pixabayApi';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

let page = 1;
const perPage = 12;

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    isError: false,
    isLoadMore: false,
  };

  handleLoadMoreButton = async () => {
    page += 1;

    try {
      const data = await getSearchImage(this.props.query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));

      let totalPage = data.totalHits / perPage;
      if (page > totalPage) {
        this.setState({ isLoadMore: false });
        return;
      }
    } catch (error) {
      this.setState({ isError: true });
    }
  };

  async componentDidUpdate(prevProps, _) {
    try {
      if (prevProps.query !== this.props.query) {
        page = 1;
        this.setState({ isLoading: true, images: [], isLoadMore: false });
        const data = await getSearchImage(this.props.query, page);

        if (data.hits.length === 0) {
          Notify.warning(
            'Sorry, there are no images matching your serach query, please try again'
          );
          this.setState({ isLoading: false });
          return;
        }

        let totalPage = data.totalHits / perPage;

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        }));

        if (totalPage > 1) {
          this.setState({ isLoadMore: true });
        }
      }
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const { images, isLoading, isError, isLoadMore } = this.state;

    return (
      <>
        {isError && <ErrorMessage />}
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
        {isLoadMore && (
          <LoadMoreButton
            handleLoadMoreButton={this.handleLoadMoreButton}
            isLoadMore={isLoadMore}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
