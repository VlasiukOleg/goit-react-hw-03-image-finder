import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import { FcSearch } from 'react-icons/fc';
import {
  Header,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.query.trim()) {
      Notify.warning('Please fill all fields');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch size={24} />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={query}
          />
        </SearchForm>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
