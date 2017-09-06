import React from 'react';
import PropTypes from 'prop-types';
import { Favorite, FavoriteBorder } from 'material-ui-icons';

const Favourite = ({ selected }) => (
  selected ?
    <Favorite style={{ fill: 'red', stroke: 'red', height: '28px', width: 'auto' }} /> :
    <FavoriteBorder style={{ fillOpacity: 0.5, strokeOpacity: 0.5, height: '28px', width: 'auto' }} />
);

Favourite.propTypes = {
  selected: PropTypes.bool,
};

Favourite.defaultProps = {
  selected: false,
};

export default Favourite;
