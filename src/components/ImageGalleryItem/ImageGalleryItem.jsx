import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  toggleModal,
  largeImageURL,
  imageURL,
  onClickImage,
}) => {
  const handle = () => {
    toggleModal();
    onClickImage(largeImageURL);
  };

  return (
    <ImageContainer>
      <ImageItem onClick={handle} src={imageURL} alt="img" />
    </ImageContainer>
  );
};

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  onClickImage: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.4s ease-in;

  object-fit: cover;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 3px 4px 2px 0 lightblue;
    scale: 1.1;
  }
`;
const ImageContainer = styled.li`
  list-style: none;
  border-radius: 8px;
  overflow: hidden;
`;
