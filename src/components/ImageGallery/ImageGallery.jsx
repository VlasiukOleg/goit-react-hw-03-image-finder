import PropTypes from 'prop-types';

import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <>
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
    </>
  );
};

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
