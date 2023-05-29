import { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadMoreBtn } from './LoadMoreButton.styled';
import { smoothScroll } from 'services/smoothscroll';

export class LoadMoreButton extends Component {
  componentDidUpdate() {
    smoothScroll();
  }

  render() {
    return (
      <LoadMoreBtn onClick={this.props.handleLoadMoreButton} id="load-more">
        LoadMore
      </LoadMoreBtn>
    );
  }
}

LoadMoreButton.propTypes = {
  handleLoadMoreButton: PropTypes.func.isRequired,
};
