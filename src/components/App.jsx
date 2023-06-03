import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { getSearchImage } from 'services/pixabayApi';
import { smoothScroll } from 'services/smoothscroll';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

const perPage = 12;

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isLoading: false,
    isError: false,
    isLoadMore: false,
  };

  onSubmit = query => {
    if (this.state.query === query) {
      Notify.warning('images for this query are now shown');
      return;
    }
    this.setState({
      query,
      page: 1,
      images: [],
      isLoading: true,
      isLoadMore: false,
    });
  };

  handleLoadMoreButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    setTimeout(() => {
      smoothScroll();
    }, 500);
  };

  async componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.query !== this.state.query ||
        prevState.page !== this.state.page
      ) {
        const data = await getSearchImage(this.state.query, this.state.page);

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

        let totalPage = data.totalHits / perPage;

        if (totalPage > 1) {
          this.setState({ isLoadMore: true });
        }

        if (this.state.page > totalPage) {
          this.setState({ isLoadMore: false });
        }
      }
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const { images, isLoading, isError, isLoadMore } = this.state;
    return (
      <AppStyle>
        {isError && <ErrorMessage />}
        <SearchBar onSubmit={this.onSubmit} />
        {isLoading && <LoadingSpinner />}
        <ImageGallery images={images} />
        {isLoadMore && (
          <LoadMoreButton handleLoadMoreButton={this.handleLoadMoreButton} />
        )}
      </AppStyle>
    );
  }
}
