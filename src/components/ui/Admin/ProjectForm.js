import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'whatwg-fetch';
import { withStyles } from 'material-ui/styles';
import { TextField, Button, Grid, Switch, IconButton } from 'material-ui';
import Favourite from '../Favourite';
import spreadObject from '../../../helpers/spreadObject';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  formRow: {
    lineHeight: '54px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});

function Submit({ classes, disabled, onClick }) {
  return disabled ?
    <Button raised color="primary" className={classes.button} onClick={() => onClick()} >
      Submit
    </Button> :
    <Button raised color="accent" disabled className={classes.button} onClick={() => onClick()} >
      Submit
    </Button>;
}

Submit.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Undo({ classes, disabled }) {
  return disabled ?
    <Button raised color="primary" className={classes.button}>
      Clear Changes
    </Button> :
    <Button raised color="accent" disabled className={classes.button}>
      Clear Changes
    </Button>;
}

Undo.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};


// implement redirect if project updated from new to edit
class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      changed: false,
      fireRedirect: false,
      edit: props.edit,
      new: props.new,
      value: '',
      project: {
        _id: '',
        title: '',
        link: '',
        miniDetail: '',
        git: '',
        real: false,
        favourite: false,
        lastUpdate: '',
        createdDate: '',
        public: false,
      },
      preEditProject: {
        _id: '',
        title: '',
        link: '',
        miniDetail: '',
        git: '',
        real: false,
        favourite: false,
        lastUpdate: '',
        createdDate: '',
        public: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    if (this.state.edit) {
      // load object

      // fetch data from API

      // set project and preEditProject to data from API
    } else {
      // render project with empty attributes
    }
  }

  handleDate(evt) {
    const id = evt.target.id;
    const updatedProject = spreadObject(this.state.project, {});
    updatedProject[id] = moment(evt.target.value);
    this.setState({ project: updatedProject, changed: true });
  }

  handleFavourite() {
    const updatedProject = spreadObject(this.state.project, {});
    updatedProject.favourite = !this.state.project.favourite;
    this.setState({ project: updatedProject });
  }

  handleSwitch() {
    const updatedProject = spreadObject(this.state.project, {});
    updatedProject.public = !this.state.project.public;
    this.setState({ project: updatedProject, changed: true });
  }

  handleChange(evt) {
    const id = evt.target.id;
    const updatedProject = spreadObject(this.state.project, {});
    updatedProject[id] = evt.target.value;
    this.setState({ project: updatedProject, changed: true });
  }

  handleSubmit(evt) {
    console.log(evt);
    const project = Object.assign({}, this.state.project);
    console.log(project);

    delete project._id;

    fetch('/api/v1/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    }).then((response) => {
      console.log('posted');
      if (response.ok) {
        response.json().then((newProject) => {
          newProject.createdDate = moment(newProject.createdDate);
          newProject.lastUpdate = moment(newProject.lastUpdate);
          console.log(`Created project ${newProject._id}`);
          this.setState({ project: newProject, preEditProject: newProject, fireRedirect: true });
        });
      } else {
        response.json().then((error) => {
          alert(`Failed to create new project: ${error.message}`);
        });
      }
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    const { from } = this.props.location.state || '/';
    const { classes } = this.props;
    const { project, edit, fireRedirect } = this.state;

    return (

      <div className={classes.container} id="project-form">
        <form>
          <Grid container spacing={16} >
            <Grid item xs={12} sm={12} md={6} style={{ border: '1px solid grey', fontSize: '24px' }}>
              {edit ? 'Edit Project' : 'New Project'}
            </Grid>
            <Grid item xs={12} sm={12} md={6} style={{ border: '1px solid grey' }}>
              <Undo classes={classes} disabled={this.state.changed} onClick={this.reset} />
              <Submit classes={classes} disabled={this.state.changed} onClick={this.handleSubmit} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} style={{ border: '1px solid grey' }}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    label="Project Title"
                    required
                    fullWidth
                    onChange={this.handleChange}
                    value={project.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="_id"
                    label="_id"
                    disabled={this.state.new}
                    fullWidth
                    onChange={this.handleChange}
                    value={this.state.value}
                  />
                </Grid>
                <Grid item xs={6}>
                  {'Public '}
                  <Switch
                    checked={project.public}
                    onChange={this.handleSwitch}
                    aria-label="isPublic"
                  />
                </Grid>
                <Grid item xs={6}>
                  {'Favourite '}
                  <IconButton onClick={this.handleFavourite} >
                    <Favourite
                      id="favourite"
                      selected={project.favourite}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="link"
                    label="Project Web Address"
                    fullWidth
                    onChange={this.handleChange}
                    value={project.link}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="git"
                    label="Github Repository"
                    fullWidth
                    onChange={this.handleChange}
                    value={project.git}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="createdDate"
                    label="Created Date"
                    type="date"
                    helperText={'dd/mm/yyyy'}
                    className={classes.textField}
                    onBlur={this.handleDate}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="lastUpdate"
                    label="Last Update"
                    type="date"
                    helperText={'dd/mm/yyyy'}
                    className={classes.textField}
                    onBlur={this.handleDate}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} style={{ border: '1px solid grey' }}>
              Picture Management
            </Grid>
            <Grid item xs={12} style={{ border: '1px solid grey' }}>
              <TextField
                id="miniDetail"
                label="Project Detail"
                multiline
                fullWidth
                rowsMax="10"
                value={project.miniDetail}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
        </form>
        {
          fireRedirect && (
            <Redirect to={from || `/projects/${project._id}`} />
          )
        }
      </div>
    );
  }
}

ProjectForm.propTypes = {
  classes: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  new: PropTypes.bool,
  location: PropTypes.object.isRequired,
};

ProjectForm.defaultProps = {
  edit: false,
  new: false,
};

export default withStyles(styles)(ProjectForm);
