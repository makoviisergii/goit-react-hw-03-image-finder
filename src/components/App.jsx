import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

import Loader from './Loader/Loader';
import { Sesrchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';

const statusList = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  reject: 'reject',
  idle: 'idle',
};

export class App extends Component {
  state = {
    images: [],
    page: 1,
    pages: 2,
    error: null,
    searchQuery: 'cars',
    // loading:true,
    status: statusList.idle,
  };

  handleSubmit = str => {
    this.setState({ searchQuery: str });
  };

  handlChangePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.handleGetImages();
  };

  handleGetImages = () => {
    this.setState({ status: statusList.loading });
    const { searchQuery, page } = this.state;
    Loader(searchQuery, page)
      .then(res =>
        this.setState({
          images: res.data.hits,
          pages: Math.ceil(res.data.total / 12),
          status: statusList.success,
        })
      )
      .catch(error => this.setState({ error, status: statusList.error }));
  };

  componentDidMount() {
    this.handleGetImages();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ page: 1 });
      this.handleGetImages();
    }
  }

  render() {
    const { images, status, page, pages } = this.state;
    if (status === statusList.loading) {
      return (
        <div>
          <Sesrchbar onSubmit={this.handleSubmit} />
          <Preloader>
            <h1>Loading....</h1>
          </Preloader>
        </div>
      );
    }
    if (status === statusList.success || status === statusList.idle) {
      return (
        <>
          <Sesrchbar onSubmit={this.handleSubmit} />
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem key={image.id} imageURL={image.largeImageURL} />
            ))}
          </ImageGallery>
          <LoadMoreBtn
            handlChangePage={this.handlChangePage}
            page={page}
            pages={pages}
          />
          ;
        </>
      );
    }
    if (status === statusList.error && status !== statusList.loading) {
      return (
        <div>
          <Sesrchbar onSubmit={this.handleSubmit} />
          <h1>No image found, please make another request</h1>
        </div>
      );
    }
  }
}

const ImageGallery = styled.div`
  display: grid;
  padding: 20px 15px;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;
const Preloader = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
