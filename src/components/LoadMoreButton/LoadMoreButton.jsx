import { Component } from 'react';
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
