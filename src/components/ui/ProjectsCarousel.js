import React, { Component } from 'react';
import { Slider } from 'react-slick';
import PropTypes from 'prop-types';

class ProjectsCarousel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { projects, slidesToShow } = this.props;
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      speed: null,
      slidesToShow,
    };

    return (
      <Slider {...settings}>
        {(projects) ?
          projects.map(p => <div><h3>{p.title}</h3></div>) :
          <div><h3>No Projects Currently Available</h3></div>
        }
      </Slider>
    );
  }
}

ProjectsCarousel.propTypes = {
  projects: PropTypes.array.isRequired,
  slidesToShow: PropTypes.number.isRequired,
};

ProjectsCarousel.defaultProps = {
  projects: [],
  slidesToShow: 3,
};

export default ProjectsCarousel;
