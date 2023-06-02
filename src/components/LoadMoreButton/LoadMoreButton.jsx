import PropTypes from 'prop-types';
import { LoadMoreBtn } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ handleLoadMoreButton }) => {
  return (
    <LoadMoreBtn onClick={handleLoadMoreButton} id="load-more">
      LoadMore
    </LoadMoreBtn>
  );
};

LoadMoreButton.propTypes = {
  handleLoadMoreButton: PropTypes.func.isRequired,
};
