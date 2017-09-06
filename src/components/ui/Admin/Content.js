import React from 'react';
import { Route, Switch } from 'react-router-dom';
import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import ProjectTable from './ProjectTable';
import ProjectForm from './ProjectForm';

const theme = createMuiTheme();

const Projects = () => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      <Route exact path="/projects" component={ProjectTable} />
      <Route
        exact
        path="/projects/new"
        render={routedProps => <ProjectForm {...routedProps} new />}
      />
      <Route
        exact
        path="/projects/:projectId"
        render={routedProps => <ProjectForm {...routedProps} edit />}
      />
    </Switch>
  </MuiThemeProvider>
);

export default Projects;
