import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v4';
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
    this.submitEdit = this.submitEdit.bind(this);
    this.submitNew = this.submitNew.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    if (this.state.edit) {
      console.log('edit state is true');
      // load object
      const projectId = this.props.match.params.projectId;
      // fetch data from API
      fetch(`/api/v1/project/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        if (response.ok) {
          response.json().then((project) => {
            console.log(project);
            project.createdDate = moment(project.createdDate).format('YYYY-MM-DD');
            project.lastUpdate = moment(project.lastUpdate).format('YYYY-MM-DD');
            console.log(`Retrieved project ${project._id}!`);
            this.setState({ project, changed: false, preEditProject: project });
          });
        } else {
          response.json().then((error) => {
            console.log(`issue retrieving project ${projectId}: ${error}`);
          });
        }
      }).catch((err) => {
        console.log(`issue retrieving project ${projectId}: ${err}`);
      });
    } else {
      const newProject = {
        _id: uuid(),
        title: '',
        link: '',
        miniDetail: '',
        git: '',
        real: false,
        favourite: false,
        lastUpdate: moment().format('YYYY-MM-DD'),
        createdDate: moment().format('YYYY-MM-DD'),
        public: false,
      };
      this.setState({ project: newProject, preEditProject: newProject, changed: false });
    }
  }

  handleDate(evt) {
    const id = evt.target.id;
    const updatedProject = spreadObject(this.state.project, {});
    updatedProject[id] = moment(evt.target.value).format('YYYY-MM-DD');
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

  handleSubmit() {
    if (this.state.edit) {
      this.submitEdit();
    } else {
      this.submitNew();
    }
  }
  
  submitEdit() {
    
  }
  
  submitNew() {
    const project = spreadObject({}, this.state.project);

    project.createdDate = moment(project.createdDate);
    project.lastUpdate = moment(project.lastUpdate);

    fetch('/api/v1/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        console.log('posted');
        response.json().then((newProject) => {
          newProject.createdDate = moment(newProject.createdDate).format('YYYY-MM-DD');
          newProject.lastUpdate = moment(newProject.lastUpdate).format('YYYY-MM-DD');
          console.log(`Created project ${newProject._id}`);
          this.setState({
            project: newProject,
            preEditProject: newProject,
            fireRedirect: true,
            edit: true,
            new: false,
            changed: false,
          });
        });
      } else {
        response.json().then((error) => {
          console.log(error);
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
    const { project, preEditProject, edit, fireRedirect } = this.state;

    return (

      <div className={classes.container} id="project-form">
        <form>
          <Grid container spacing={16} >
            <Grid item xs={12} sm={12} md={6} style={{ fontSize: '24px' }}>
              {edit ? 'Edit Project' : 'New Project'}
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
              <Undo classes={classes} disabled={this.state.changed} onClick={this.reset} />
              <Submit classes={classes} disabled={this.state.changed} onClick={this.handleSubmit} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    label="Project Title"
                    required
                    fullWidth
                    placeholder={preEditProject.title}
                    onChange={this.handleChange}
                    value={project.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="_id"
                    label="_id"
                    disabled
                    fullWidth
                    onChange={this.handleChange}
                    value={project._id}
                    placeholder={preEditProject._id}
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
                    placeholder={preEditProject.link}
                    value={project.link}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="git"
                    label="Github Repository"
                    fullWidth
                    placeholder={preEditProject.git}
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
                    placeholder={project.createdDate}
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
                    placeholder={project.lastUpdate}
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
            <Grid item xs={12} sm={12} md={6} >
              Picture Management
            </Grid>
            <Grid item xs={12} >
              <TextField
                id="miniDetail"
                label="Project Detail"
                multiline
                fullWidth
                rowsMax="10"
                placeholder={preEditProject.miniDetail}
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
  match: PropTypes.object.isRequired,
};

ProjectForm.defaultProps = {
  edit: false,
  new: false,
};

export default withStyles(styles)(ProjectForm);
