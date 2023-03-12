import React from 'react';
import { Component } from 'react';

import { Sesrchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  render() {
    return (
      <div>
        <Sesrchbar />
        <ImageGallery />
      </div>
    );
  }
}
