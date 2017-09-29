import React, { Component } from 'react';
import 'whatwg-fetch';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
    };
  }

  /* componentDidMount(){
  } */

  render() {
    const { gallery } = this.state;
    return (
      <div>
        <h1>Image Gallery</h1>
        {gallery.length !== 0 ?
          <div>Images Found!</div> :
          <div>No Images found (WAH)</div>
        }
      </div>
    );
  }
}

export default Gallery;
