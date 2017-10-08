import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { CloudinaryContext } from 'cloudinary-react';
import 'whatwg-fetch';
import PictureCard from './PictureCard';

const imageStartUrl = 'http://res.cloudinary.com/di6bv5utg/image/upload/v1506681645/';
const cloudName = 'di6bv5utg';

function ProjectPhoto({ url }) {
  const pictureData = {
    url: imageStartUrl + url,
  };
  return (
    <CloudinaryContext cloudName={cloudName} >
      <div className="responsive" >
        <PictureCard pictureData={pictureData} />
      </div>
    </CloudinaryContext>
  );
}

ProjectPhoto.propTypes = {
  url: PropTypes.string.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  gallery: {
    /**/
  },
  projectPhoto: {
    textAlign: 'center',
    padding: 16,
  },
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
    const { classes } = this.props;
    const { gallery } = this.state;
    return (
      <div className={classes.gallery} >
        <h1>Image Gallery</h1>
        <Grid container spacing={16} className={classes.root}>
          {gallery.length !== 0 ?
            gallery.map(({ public_id }, i) => {
              const id = `image_${i}`;
              return (
                <Grid item xs={12} md={6} lg={4}>
                  <ProjectPhoto url={public_id} key={id} className={classes.projectPhoto} />
                </Grid>
              );
            }) :
            <div>No Images found (WAH)</div>
          }
        </Grid>
      </div>
    );
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);
