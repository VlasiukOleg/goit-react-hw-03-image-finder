import { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadMoreBtn } from './LoadMoreButton.styled';
import { SmoothScroll } from 'services/smoothscroll';

export class LoadMoreButton extends Component {
  componentDidUpdate() {
    SmoothScroll();
  }

  render() {
    return (
      <LoadMoreBtn onClick={this.props.handleLoadMoreButton}>
        LoadMore
      </LoadMoreBtn>
    );
  }
}

LoadMoreButton.propTypes = {
  handleLoadMoreButton: PropTypes.func.isRequired,
};
