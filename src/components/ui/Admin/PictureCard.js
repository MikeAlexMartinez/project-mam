import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
    margin: 30,
  },
  media: {
    height: 200,
  },
};

function PictureCard(props) {
  const { pictureData, classes } = props;
  const { url } = pictureData;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={url}
          title={'pictureTitle'}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {'projectTitle'}
          </Typography>
          <Typography component="p">
            {'projectPictureText'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color="primary">
            Edit
          </Button>
          <Button dense color="primary">
            Make Primary
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

PictureCard.propTypes = {
  classes: PropTypes.object.isRequired,
  pictureData: PropTypes.object.isRequired,
};

export default withStyles(styles)(PictureCard);
