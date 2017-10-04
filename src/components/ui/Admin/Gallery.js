import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext, Image } from 'cloudinary-react';
import 'whatwg-fetch';

const imageStartUrl = 'http://res.cloudinary.com/di6bv5utg/image/upload/v1506681645/';
const cloudName = 'di6bv5utg';

function ProjectPhoto({ url }) {
  return (
    <CloudinaryContext cloudName={cloudName} >
      <div className="responsive" >
        <div className="img">
          <a target="_blank" href={`${imageStartUrl + url}.jpg`}>
            <Image publicId={url} />
          </a>
        </div>
      </div>
    </CloudinaryContext>
  );
}

ProjectPhoto.propTypes = {
  url: PropTypes.string.isRequired,
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
    };
  }

  componentDidMount() {
    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }

    function parseJSON(response) {
      return response.json();
    }

    fetch('http://res.cloudinary.com/di6bv5utg/image/list/project-mam.json')
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        this.setState({ gallery: response.resources });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { gallery } = this.state;
    return (
      <div>
        <h1>Image Gallery</h1>
        {gallery.length !== 0 ?
          gallery.map(({ public_id }, i) => {
            const id = `image_${i}`;
            return (
              <ProjectPhoto url={public_id} key={id} />
            );
          }) :
          <div>No Images found (WAH)</div>
        }
      </div>
    );
  }
}

export default Gallery;
