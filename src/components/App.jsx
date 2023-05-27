import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

export class App extends Component {
  state = {
    query: '',
  };

  onSubmit = query => {
    if (this.state.query === query) {
      Notify.warning('images for this query are now shown');
      return;
    }
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <AppStyle>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery query={query} />
      </AppStyle>
    );
  }
}
